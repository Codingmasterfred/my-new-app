using Microsoft.EntityFrameworkCore;
using my_new_app.Models;


namespace my_new_app
{
    public class DbContexts : DbContext
    {
        public DbSet<Category> Categories { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbContexts(DbContextOptions options) : base(options)
        { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

           // modelBuilder.Entity<Product>().HasOne<Category>(c => c.Category).WithMany(c => c.Products).HasForeignKey(c => c.CategoryId);
        }

    }
}