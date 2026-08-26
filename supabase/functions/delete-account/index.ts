import "@supabase/functions-js/edge-runtime.d.ts";
import { withSupabase } from "@supabase/server";

export default {
  fetch: withSupabase(
    { auth: ["user", "secret"] },
    async (req, ctx) => {
      try {
        const { jwtClaims, supabaseAdmin, authMode } = ctx;

        // -----------------------------------------
        // 1. Identify caller
        // -----------------------------------------

        const callerId = jwtClaims.sub;
        const callerRole = jwtClaims.user_role;

        if (!callerId) {
          return Response.json(
            { error: "Unable to identify user" },
            { status: 401 },
          );
        }

        const {data:callerProfile, error: callerProfileError} = await supabaseAdmin.from("profiles").select("id, public_id, email, first_name, last_name").eq("id", callerId).single();
        if(callerProfileError) {
          console.error("Failed to fetch target caller profile:", callerId);

          return Response.json(
            { error: "Failed to retrieve caller" },
            { status: 500 },
          );
        }

        // -----------------------------------------
        // 2. Validate request
        // -----------------------------------------

        const { targetUserIds } = await req.json();

        if (
          !Array.isArray(targetUserIds) ||
          targetUserIds.length === 0
        ) {
          return Response.json(
            { error: "targetUserIds must be a non-empty array" },
            { status: 400 },
          );
        }

        // Remove duplicate IDs
        const uniqueTargetIds = [...new Set(targetUserIds)];

        // -----------------------------------------
        // 3. Get target profiles in ONE query
        // -----------------------------------------

        const { data: targetProfiles, error: targetError } =
          await supabaseAdmin
            .from("profiles")
            .select("id, role, email")
            .in("id", uniqueTargetIds);

        if (targetError) {
          console.error("Failed to fetch target profiles:", targetError);

          return Response.json(
            { error: "Failed to retrieve users" },
            { status: 500 },
          );
        }

        // -----------------------------------------
        // 4. Make sure every requested user exists
        // -----------------------------------------

        if (targetProfiles.length !== uniqueTargetIds.length) {
          return Response.json(
            { error: "One or more users were not found" },
            { status: 404 },
          );
        }

        // -----------------------------------------
        // 5. Check authorization for every target
        // -----------------------------------------

        for (const target of targetProfiles) {
          const isDeletingSelf = callerId === target.id;

          // Super admin cannot delete their own account
          if (isDeletingSelf && callerRole === "super_admin") {
            return Response.json(
              { error: "The super admin account cannot be deleted." },
              { status: 403 },
            );
          }

          // User can always delete themselves
          if (isDeletingSelf) {
            continue;
          }

          const canDelete =
            (callerRole === "admin" && target.role === "user") ||
            (
              callerRole === "super_admin" &&
              (target.role === "user" || target.role === "admin")
            );

          if (!canDelete) {
            return Response.json(
              {
                error: `You do not have permission to delete ${target.email}`,
              },
              { status: 403 },
            );
          }
        }

        // -----------------------------------------
        // 6. Delete users
        // -----------------------------------------

        const results = [];

        for (const target of targetProfiles) {
          const { error: deleteError } =
            await supabaseAdmin.auth.admin.deleteUser(target.id);

          if (deleteError) {
            console.error(
              `Failed to delete ${target.email}:`,
              deleteError,
            );

            results.push({
              id: target.id,
              email: target.email,
              success: false,
              error: deleteError.message,
            });

            continue;
          }

          console.log(
            `[${authMode}] ${callerProfile.public_id}:${callerProfile.first_name} ${callerProfile.last_name} deleted ${target.email}`,
          );

          results.push({
            callerId: callerId,
            targetId: target.id,
            email: target.email,
            success: true,
          });
        }

        // -----------------------------------------
        // 7. Return results
        // -----------------------------------------

        return Response.json({
          success: true,
          results,
        });
      } catch (error) {
        console.error("Unexpected error:", error);

        return Response.json(
          { error: "Internal server error" },
          { status: 500 },
        );
      }
    },
  ),
};