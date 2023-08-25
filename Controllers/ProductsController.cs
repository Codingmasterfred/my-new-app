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

            [HttpPost]
            public async Task<ActionResult> CreateProduct(string name, string description, double price, int categoryId)
        {
                Product product = new  Product( name, description, price, categoryId);
                _context.Products.Add(product);
                _context.SaveChanges();
                return Ok();
            }

            [HttpDelete]
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

            [HttpPut]
            public async Task<ActionResult> UpdateProduct(int id, string name, string description)
            {
                try
                {
                    Product productToUpdate = await _context.Products.FindAsync(id);

                    if (productToUpdate == null)
                    {
                        return NotFound(); // Return a 404 Not Found response if the category doesn't exist
                    }

                    productToUpdate.Name = name; // Update the name
                    productToUpdate.Description = description; // Update the description

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
