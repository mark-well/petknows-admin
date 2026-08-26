import { supabase } from "../../../utils/supabase";

const deleteUserAccount = async (targetUserIds: Set<string>) => {
  const { data, error } = await supabase.functions.invoke("delete-account", {
    body: {
      targetUserIds:[...targetUserIds],
    },
  });

  // If there is an error handle and throw
  if (error) {
    let errorMessage = error.message;

    if(error.context) {
      try {
        const errorBody = await error.context.json();
        if(errorBody?.error) {
          errorMessage = errorBody.error;
        };
      } catch (e) {}
    }

    throw new Error(errorMessage);
  }
  return data;
};

export default deleteUserAccount;