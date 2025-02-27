
const sampleUser = {
   id: "12345",
   name: "John Doe",
   email: "john.doe@example.com",
   phone: '084-110-8312',
   taxId: '1103300137575',
   address: '37/27 Moo 12 Bangpleeyai, Bangplee, Samut Prakan, Thailand',
   passwordHash: "hashedpassword123",
   role: "freelancer",
   avatarUrl: "https://example.com/avatar/johndoe.png",
   createdAt: new Date("2023-01-01T10:00:00Z"),
   updatedAt: new Date("2025-01-01T12:00:00Z"),
   bio: "Freelancer specializing in web development and design.",
   contacts: ["67890", "23456"],
   projects: ["project1", "project2", "project3"],
   settings: {
     theme: "dark",
     notifications: {
       email: true,
       push: false,
     },
   },
   paymentDetails: {
     accountHolderName: "John Doe",
     accountNumber: "1234567890",
     bankName: "Example Bank",
     swiftCode: "EXAMPLBANK123",
   },
 };
 
export const getUserData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
     resolve(sampleUser);
    }, 2000);
  });
};


export const editUser = (updatedUser) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      Object.assign(sampleUser, updatedUser);
      resolve(sampleUser);
    }, 2000);
  });
};

export const getUser = (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (sampleUser.id === id) {
        resolve(sampleUser);
      } else {
        reject(new Error("User not found"));
      }
    }, 2000);
  });
};

export const getAllUsers = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([sampleUser]);
    }, 2000);
  });
};

export const createUser = (newUser) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const createdUser = { ...newUser, id: Date.now().toString() };
      resolve(createdUser);
    }, 2000);
  });
};

export const deleteUser = (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (sampleUser.id === id) {
        resolve({ message: "User deleted successfully" });
      } else {
        reject(new Error("User not found"));
      }
    }, 2000);
  });
};