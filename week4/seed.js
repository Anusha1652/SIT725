const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/myprojectDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Define Project model
const ProjectSchema = new mongoose.Schema({
  title: String,
  image: String,
  link: String,
  description: String,
});
const Project = mongoose.model('Project', ProjectSchema);

// Seed function
async function seedData() {
  const sampleProjects = [
    {
      title: "Kitten 1",
      image: "images/kitten1.jpg",
      link: "About Kitten 1",
      description: "This is the first cute kitten."
    },
    {
      title: "Kitten 2",
      image: "images/kitten2.jpg",
      link: "About Kitten 2",
      description: "This is the second fluffy kitten."
    }
  ];

  try {
    await Project.deleteMany(); // Optional: clears existing data
    await Project.insertMany(sampleProjects);
    console.log(" Sample projects inserted successfully!");
  } catch (err) {
    console.error(" Error inserting sample projects:", err);
  } finally {
    mongoose.connection.close();
  }
}

// Run seed after DB connection
mongoose.connection.on('connected', async () => {
  console.log(' Connected to MongoDB for seeding.');
  await seedData();
});


