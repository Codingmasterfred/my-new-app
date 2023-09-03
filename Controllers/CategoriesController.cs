using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Metadata;
using System.Runtime.Intrinsics.X86;
using System.Threading.Tasks;
using Azure;
using Humanizer;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using my_new_app.Models;
using Newtonsoft.Json.Linq;


namespace my_new_app.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CategoriesController : Controller
    {
        private readonly DbContexts _context;

        public CategoriesController(DbContexts context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IEnumerable<Category>> GetCategories()
        {
            var categories = _context.Categories.Include(c => c.Products).ToList();
            return categories;
        }


        [HttpGet("{id}")]   
        public async Task<ActionResult<Category>> GetOneCategory(int id)
        {
            
            
                var oneItem = await _context.Categories.Include(c => c.Products).FirstOrDefaultAsync(c => c.Id == id); 

                if (oneItem == null)
                {
                    return NotFound(); // Return a 404 Not Found response if the category doesn't exist
                }

                return oneItem;

             
            
           
        }



        [HttpPost]
        public async Task<ActionResult> CreateCategory(string name, string description)
        {
            Category category = new Category(name, description);
            _context.Categories.Add(category);
            _context.SaveChanges();
            return Ok();
        }

        [HttpDelete]
        public async Task<ActionResult> DeleteCategory(int id)
        {
            try
            {
                Category categoryToDelete = await _context.Categories.FindAsync(id);

                if (categoryToDelete == null)
                {
                    return NotFound(); // Return a 404 Not Found response if the category doesn't exist
                }

                _context.Categories.Remove(categoryToDelete);
                await _context.SaveChangesAsync();

                return Ok(); // Return a 200 OK response
            }
            catch (Exception ex)
            {
                // Log the exception or handle it in an appropriate way
                return StatusCode(500, "An error occurred while processing your request.");
            }
        }

        [HttpPut]
        public async Task<ActionResult> UpdateCategory(int id, string name, string description)
        {
            try
            {
                Category categoryToUpdate = await _context.Categories.FindAsync(id);

                if (categoryToUpdate == null)
                {
                    return NotFound(); // Return a 404 Not Found response if the category doesn't exist
                }

                categoryToUpdate.Name = name; // Update the name
                categoryToUpdate.Description = description; // Update the description

                _context.Categories.Update(categoryToUpdate);
                await _context.SaveChangesAsync();

                return Ok(); // Return a 200 OK response
            }
            catch (Exception ex)
            {
                // Log the exception or handle it in an appropriate way
                return StatusCode(500, "An error occurred while processing your request.");
            }
        }
       










    }
}
