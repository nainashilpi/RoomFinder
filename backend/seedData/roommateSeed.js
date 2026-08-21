const roommates = [
  {
    name: "Arjun Sharma",
    age: 24,
    gender: "Male",
    occupation: "Working Professional",
    bio: "Software engineer at a tech startup. I am a clean, organized and respectful person. I work regular office hours and prefer a quiet environment in the evenings. I enjoy cooking on weekends and am looking for a like-minded roommate.",
    budget: 8000,
    preferredLocation: {
      city: "Bangalore",
      area: "Koramangala",
    },
    preferredGender: "Male",
    lifestyle: {
      smoking: false,
      drinking: false,
      pets: false,
      vegetarian: true,
    },
    contactNumber: "9811111111",
    profileImage:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400",
    isVerified: true,
    status: "Available",
  },

  {
    name: "Priya Mehta",
    age: 22,
    gender: "Female",
    occupation: "Student",
    bio: "Final year MBA student at a top business school. Looking for a female roommate near the college campus. I am very friendly, keep my space tidy and am always up for movie nights and food explorations. Non-smoker and vegetarian.",
    budget: 6000,
    preferredLocation: {
      city: "Pune",
      area: "Shivajinagar",
    },
    preferredGender: "Female",
    lifestyle: {
      smoking: false,
      drinking: false,
      pets: false,
      vegetarian: true,
    },
    contactNumber: "9822222222",
    profileImage:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
    isVerified: true,
    status: "Available",
  },

  {
    name: "Rohit Verma",
    age: 26,
    gender: "Male",
    occupation: "Working Professional",
    bio: "Product manager at a leading e-commerce company in Gurugram. I travel occasionally for work and am looking for a responsible roommate to share my 2BHK apartment. Easy-going, social and love weekend trips. Open to anyone who is respectful of shared spaces.",
    budget: 12000,
    preferredLocation: {
      city: "Gurugram",
      area: "Cyber City",
    },
    preferredGender: "Anyone",
    lifestyle: {
      smoking: false,
      drinking: true,
      pets: false,
      vegetarian: false,
    },
    contactNumber: "9833333333",
    profileImage:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
    isVerified: true,
    status: "Available",
  },

  {
    name: "Sneha Iyer",
    age: 23,
    gender: "Female",
    occupation: "Working Professional",
    bio: "UX designer working in the Bandra-Kurla Complex, Mumbai. I am an introvert who loves reading, sketching and quiet evenings at home. Looking for a calm and clean female roommate. I have a small pet cat so please be okay with pets.",
    budget: 9000,
    preferredLocation: {
      city: "Mumbai",
      area: "Bandra West",
    },
    preferredGender: "Female",
    lifestyle: {
      smoking: false,
      drinking: false,
      pets: true,
      vegetarian: true,
    },
    contactNumber: "9844444444",
    profileImage:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
    isVerified: false,
    status: "Available",
  },

  {
    name: "Karan Patel",
    age: 25,
    gender: "Male",
    occupation: "Freelancer",
    bio: "Freelance video editor and content creator based in Ahmedabad. I work from home so I am around most of the time but I respect personal space completely. Looking for a chill roommate who does not mind some creativity happening around the house.",
    budget: 7000,
    preferredLocation: {
      city: "Ahmedabad",
      area: "Satellite",
    },
    preferredGender: "Male",
    lifestyle: {
      smoking: false,
      drinking: false,
      pets: false,
      vegetarian: true,
    },
    contactNumber: "9855555555",
    profileImage:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
    isVerified: false,
    status: "Available",
  },

  {
    name: "Ananya Singh",
    age: 21,
    gender: "Female",
    occupation: "Student",
    bio: "Second year engineering student at IIT Delhi. Looking for a female roommate near the campus. I am studious but also fun to hang out with. I keep my things organised and expect the same from my roommate. Looking for someone who values academics and good vibes.",
    budget: 5000,
    preferredLocation: {
      city: "Delhi",
      area: "Hauz Khas",
    },
    preferredGender: "Female",
    lifestyle: {
      smoking: false,
      drinking: false,
      pets: false,
      vegetarian: false,
    },
    contactNumber: "9866666666",
    profileImage:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400",
    isVerified: true,
    status: "Available",
  },

  {
    name: "Vikram Nair",
    age: 28,
    gender: "Male",
    occupation: "Working Professional",
    bio: "Senior data analyst at a multinational firm in Hyderabad. I am a fitness enthusiast who wakes up early and follows a disciplined routine. I prefer a clean and organised living space. Open to any gender as long as mutual respect is maintained.",
    budget: 11000,
    preferredLocation: {
      city: "Hyderabad",
      area: "Banjara Hills",
    },
    preferredGender: "Anyone",
    lifestyle: {
      smoking: false,
      drinking: false,
      pets: false,
      vegetarian: false,
    },
    contactNumber: "9877777777",
    profileImage:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400",
    isVerified: true,
    status: "Available",
  },

  {
    name: "Meera Krishnan",
    age: 27,
    gender: "Female",
    occupation: "Working Professional",
    bio: "Chartered accountant working with a top firm in Chennai. I am a responsible, clean and straightforward person. I love cooking South Indian food and watching documentaries. Looking for a mature female roommate who values hygiene and peace at home.",
    budget: 8500,
    preferredLocation: {
      city: "Chennai",
      area: "Adyar",
    },
    preferredGender: "Female",
    lifestyle: {
      smoking: false,
      drinking: false,
      pets: false,
      vegetarian: true,
    },
    contactNumber: "9888888888",
    profileImage:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400",
    isVerified: false,
    status: "Available",
  },

  {
    name: "Aditya Joshi",
    age: 23,
    gender: "Male",
    occupation: "Student",
    bio: "Post-graduate student at Jawaharlal Nehru University in Delhi. Passionate about photography, travel and street food. Looking for a budget-friendly room share near the university. I am social, open-minded and respectful of boundaries.",
    budget: 5500,
    preferredLocation: {
      city: "Delhi",
      area: "Munirka",
    },
    preferredGender: "Male",
    lifestyle: {
      smoking: false,
      drinking: true,
      pets: false,
      vegetarian: false,
    },
    contactNumber: "9899999999",
    profileImage:
      "https://images.unsplash.com/photo-1463453091185-61582044d556?w=400",
    isVerified: false,
    status: "Available",
  },

  {
    name: "Riya Desai",
    age: 24,
    gender: "Female",
    occupation: "Freelancer",
    bio: "Freelance graphic designer and illustrator working remotely from Ahmedabad. I have a flexible schedule and enjoy a calm home environment. I am a pet parent to a friendly golden retriever. Looking for a roommate who loves animals and is comfortable sharing space with a dog.",
    budget: 7500,
    preferredLocation: {
      city: "Ahmedabad",
      area: "Navrangpura",
    },
    preferredGender: "Female",
    lifestyle: {
      smoking: false,
      drinking: false,
      pets: true,
      vegetarian: true,
    },
    contactNumber: "9800000000",
    profileImage:
      "https://images.unsplash.com/photo-1489424731084-a5d8b2a2cf0f?w=400",
    isVerified: true,
    status: "Available",
  },
];

export default roommates;