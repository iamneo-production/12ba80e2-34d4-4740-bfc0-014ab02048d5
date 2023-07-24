using Microsoft.EntityFrameworkCore;
using WebApp.Models;
namespace WebApp.Context{
    public class AppDbContext: DbContext{
        public AppDbContext(DbContextOptions<AppDbContext> options):base(options){

        }
        
        public DbSet<Admin> Admins{get; set;}
        public DbSet<Institute> Institutes{get; set;}

        protected override void OnModelCreating(ModelBuilder modelBuilder){
            
            modelBuilder.Entity<Admin>().ToTable("admins");
            modelBuilder.Entity<Institute>().ToTable("institutes");
            


        }
    }
}