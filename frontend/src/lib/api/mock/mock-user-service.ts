
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