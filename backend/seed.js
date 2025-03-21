const mongoose = require("mongoose");
const Plant = require("./models/Plant");

mongoose.connect("mongodb+srv://anusuyasu22it:ySOidMdg4Zl5y9Qa@cluster0.qh0cs.mongodb.net/ayush-garden?retryWrites=true&w=majority&appName=Cluster0", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const plants = [
    {
        name: "Tulsi",
        scientificName: "Ocimum tenuiflorum",
        category: "Ayurveda",
        benefits: ["Boosts immunity", "Reduces stress", "Good for respiratory health"],
        image: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQHP0C4kp2tlqFnexwY8xqMVqo4sM9AFB_pNuQBd83AsV-PLWCwy6oSgu_qjPjGqPdg6dgZeydstgVHvdiKXkFFkw"
      },
      {
        name: "Ashwagandha",
        scientificName: "Withania somnifera",
        category: "Ayurveda",
        benefits: ["Reduces anxiety", "Improves strength", "Enhances brain function"],
        image: "https://m.media-amazon.com/images/I/41U1Uz5Q9HL.jpg"
      },
      {
        name: "Aloe Vera",
        scientificName: "Aloe barbadensis miller",
        category: "Yoga & Naturopathy",
        benefits: ["Good for digestion", "Skin healing", "Hydrates the body"],
        image: "https://agritech.tnau.ac.in/farm_enterprises/aloe_vera.jpg"
      },
      {
        name: "Neem",
        scientificName: "Azadirachta indica",
        category: "Yoga & Naturopathy",
        benefits: ["Purifies blood", "Improves oral health", "Anti-fungal"],
        image: "https://m.media-amazon.com/images/I/61W+aiLKwiL._AC_UF1000,1000_QL80_.jpg"
      },
      {
        name: "Senna",
        scientificName: "Cassia angustifolia",
        category: "Unani",
        benefits: ["Treats constipation", "Detoxifies body", "Improves digestion"],
        image: "https://media.springernature.com/lw685/springer-static/image/chp%3A10.1007%2F978-3-030-16807-0_169/MediaObjects/473661_1_En_169_Fig1_HTML.png"
      },
      {
        name: "Henna",
        scientificName: "Lawsonia inermis",
        category: "Unani",
        benefits: ["Good for hair health", "Natural cooling agent", "Reduces inflammation"],
        image: "https://lalitenterprise.com/cdn/shop/files/Untitled_design_-_2024-06-28T164017.478.webp?v=1719573501&width=1445"
      },
      {
        name: "Karisalankanni",
        scientificName: "Eclipta alba",
        category: "Siddha",
        benefits: ["Boosts liver health", "Promotes hair growth", "Improves eyesight"],
        image: "https://www.prabhanjanhorticulture.com/wp-content/uploads/2020/10/MPLA10-1.jpg"
      },
      {
        name: "Adhatoda",
        scientificName: "Justicia adhatoda",
        category: "Siddha",
        benefits: ["Relieves cough", "Good for asthma", "Clears respiratory tract"],
        image: "https://m.media-amazon.com/images/I/51dIsDFYFAL._AC_UF1000,1000_QL80_.jpg"
      },
      {
        name: "Belladonna",
        scientificName: "Atropa belladonna",
        category: "Homeopathy",
        benefits: ["Used for fever", "Relieves inflammation", "Soothes sore throat"],
        image: "https://upload.wikimedia.org/wikipedia/commons/0/0a/Atropa_belladonna_%2816627871072%29.jpg"
      },
      {
        name: "Calendula",
        scientificName: "Calendula officinalis",
        category: "Homeopathy",
        benefits: ["Heals wounds", "Soothes skin irritation", "Boosts immunity"],
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Calendula_officinalis%2C_pot_marigold.JPG/220px-Calendula_officinalis%2C_pot_marigold.JPG"
      },
      {
        name: "Brahmi",
        scientificName: "Bacopa monnieri",
        category: "Ayurveda",
        benefits: ["Boosts memory", "Reduces stress", "Improves brain function"],
        image: "https://www.dabur.com/Medical%20Plants/bacopa%20monnieri_1.jpg"
      },
      {
        name: "Shatavari",
        scientificName: "Asparagus racemosus",
        category: "Ayurveda",
        benefits: ["Supports female health", "Boosts immunity", "Aids digestion"],
        image: "https://www.apnikheti.com/upload/crops/3507idea99shatavari.jpg"
      },
      {
        name: "Lemongrass",
        scientificName: "Cymbopogon citratus",
        category: "Yoga & Naturopathy",
        benefits: ["Aids digestion", "Relieves anxiety", "Boosts immunity"],
        image: "https://nurserykart.in/cdn/shop/files/lemongrass.jpg?v=1742164724"
      },
      {
        name: "Turmeric",
        scientificName: "Curcuma longa",
        category: "Ayurveda",
        benefits: ["Anti-inflammatory", "Boosts skin health", "Supports digestion"],
        image: "https://www.padmamnursery.com/cdn/shop/files/61vZDe-zmxL.jpg?v=1728317764"
      },
      {
        name: "Ginger",
        scientificName: "Zingiber officinale",
        category: "Yoga & Naturopathy",
        benefits: ["Improves digestion", "Relieves nausea", "Boosts immunity"],
        image: "https://cdn.britannica.com/19/231119-050-35483892/Indian-ginger-Zingiber-officinale.jpg"
      },
      {
        name: "Holy Basil",
        scientificName: "Ocimum sanctum",
        category: "Ayurveda",
        benefits: ["Boosts immunity", "Reduces stress", "Fights infections"],
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkR0raX5fSxXNi8fX_iY5KPkHnRV8ZuADpbQ&s"
      },
      {
        name: "Curry Leaves",
        scientificName: "Murraya koenigii",
        category: "Ayurveda",
        benefits: ["Supports digestion", "Good for diabetes", "Promotes hair growth"],
        image: "https://mangaalharvest.com/cdn/shop/products/Curryleaves.jpg?crop=center&height=2048&v=1595610614&width=2048"
      },
      {
        name: "Peppermint",
        scientificName: "Mentha × piperita",
        category: "Homeopathy",
        benefits: ["Relieves nausea", "Good for digestion", "Soothes headaches"],
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-z6sBMlAdvKDttclh0wxLfFJZSkBor6vH4w&s"
      },
      {
        name: "Fenugreek",
        scientificName: "Trigonella foenum-graecum",
        category: "Ayurveda",
        benefits: ["Good for diabetes", "Aids digestion", "Improves lactation"],
        image: "https://vibrantliving.in/cdn/shop/files/FenugreekSeeds.png?v=1731060026&width=2048"
      },
      {
        name: "Garlic",
        scientificName: "Allium sativum",
        category: "Unani",
        benefits: ["Boosts immunity", "Lowers cholesterol", "Fights infections"],
        image: "https://plantsinformation.com/wp-content/uploads/Garlic-plant-information.jpg"
      }
];

const seedDB = async () => {
  await Plant.deleteMany({});
  await Plant.insertMany(plants);
  console.log("Database seeded!");
  mongoose.connection.close();
};

seedDB();
