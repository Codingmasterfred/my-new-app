using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using my_new_app;
using my_new_app.Models;

namespace my_new_app.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ProductsController : Controller
    {
        private readonly DbContexts _context;

        public ProductsController(DbContexts context)
        {
            _context = context;
        }

        [HttpGet]
            public async Task<IEnumerable<Product>> GetProducts()
            {
                var products = _context.Products.ToList();
                return products;
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
            public async Task<ActionResult> CreateProduct(Product product)
        {
                Product products = new Product( product.Name, product.Description, product.Price, product.CategoryId);
                _context.Products.Add(products);
                _context.SaveChanges();
                return Ok();
            }

            [HttpDelete("{id}")]
            public async Task<ActionResult> DeleteProduct(int id)
            {
                try
                {
                    Product productToDelete = await _context.Products.FindAsync(id);

                    if (productToDelete == null)
                    {
                        return NotFound(); // Return a 404 Not Found response if the category doesn't exist
                    }

                    _context.Products.Remove(productToDelete);
                    await _context.SaveChangesAsync();

                    return Ok(); // Return a 200 OK response
                }
                catch (Exception ex)
                {
                    // Log the exception or handle it in an appropriate way
                    return StatusCode(500, "An error occurred while processing your request.");
                }
            }

            [HttpPut("{id}")]
        public async Task<ActionResult> UpdateProduct(int id,  Product model)
        {
                try
                {
                    Product productToUpdate = await _context.Products.FindAsync(id);

                    if (productToUpdate == null)
                    {
                        return NotFound(); // Return a 404 Not Found response if the category doesn't exist
                    }

                    productToUpdate.Name = model.Name; // Update the name
                    productToUpdate.Description = model.Description; // Update the description

                    _context.Products.Update(productToUpdate);
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
