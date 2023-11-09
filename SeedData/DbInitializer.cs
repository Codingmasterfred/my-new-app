
using my_new_app.Models;

namespace my_new_app.SeedData
{
    public class DbInitializer
    {
        public static void SeedData(DbContexts context)
        {
            Console.WriteLine("Seeding data...");
            if (!context.Categories.Any())
            {
                var categories = new List<Category>
                {
                new Category("Electronics", "Description1"),
                new Category("Clothing", "Description2"),
                new Category("Home & Furniture", "Description2"),
                new Category("Health & Beauty", "Description2"),
                new Category("Sports & Outdoors", "Description2"),
                new Category("Books & Media", "Description2"),
                new Category("Toys & Games", "Description2"),
    // Add more seed data as needed
                };
                context.Categories.AddRange(categories);
                context.SaveChanges();
            }
        }

        public static void SeedData(object context)
        {
            throw new NotImplementedException();
        }
    }
}
