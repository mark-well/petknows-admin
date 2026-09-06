export const queryPet = `
      id,
      public_id,
      name,
      pet_type,
      created_at,
      avatar_url,
      breed,
      color,
      description,
      status,
      profiles(public_id, first_name, last_name, email, contact_number)
    `;
