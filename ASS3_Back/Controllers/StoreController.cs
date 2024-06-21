using Assignment3_Backend.Models;
using Assignment3_Backend.ViewModels;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Globalization;
using System.IdentityModel.Tokens.Jwt;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;
using System.Runtime.InteropServices;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Assignment3_Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StoreController : ControllerBase
    {
        private readonly IRepository _repository;
        public StoreController(IRepository repository)
        {
            _repository = repository;
        }

        [HttpGet]
        [Route("ProductListing")]
        public async Task<ActionResult> ProductListing()
        {
            try
            {
                var results = await _repository.GetProductsAsync();

                dynamic products = results.Select(p => new
                {
                    p.ProductId,
                    p.Price,
                    ProductTypeName = p.ProductType.Name,
                    BrandName = p.Brand.Name,
                    p.Name,
                    p.Description,
                    p.DateCreated,
                    p.DateModified,
                    p.IsActive,
                    p.IsDeleted,
                    p.Image
                });

                return Ok(products);
            }
            catch (Exception)
            {

                return StatusCode(StatusCodes.Status500InternalServerError, "Internal Server Error. Please contact support.");
            }
        }

        [HttpPost, DisableRequestSizeLimit]
        [Route("AddProduct")]
        public async Task<IActionResult> AddProduct([FromForm] IFormCollection formData)
        {
            try
            {
                var formCollection = await Request.ReadFormAsync();
                
                var file = formCollection.Files.First();
                
                if (file.Length > 0)
                {
                    
                    using (var ms = new MemoryStream())
                    {
                        file.CopyTo(ms);
                        var fileBytes = ms.ToArray();
                        string base64 = Convert.ToBase64String(fileBytes);

                        string price = formData["price"];
                        decimal num = decimal.Parse(price.Replace(".", ","));

                        var product = new Product
                        {
                            Price = num
                            ,
                            Name = formData["name"]
                            ,
                            Description = formData["description"]
                            ,
                            BrandId = Convert.ToInt32(formData["brand"])
                            ,
                            ProductTypeId = Convert.ToInt32(formData["producttype"])
                            ,
                            Image = base64
                            ,
                            DateCreated = DateTime.Now
                        };


                        _repository.Add(product);
                        await  _repository.SaveChangesAsync();                        
                    }

                    return Ok();
                }
                else
                {
                    return BadRequest();
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex}");
            }
        }


        [HttpGet]
        [Route("Brands")]
        public async Task<ActionResult> Brands()
        {
            try
            {
                var results = await _repository.GetBrandsAsync();

                return Ok(results);
            }
            catch (Exception)
            {

                return StatusCode(StatusCodes.Status500InternalServerError, "Internal Server Error. Please contact support.");
            }
        }


        [HttpGet]
        [Route("ProductTypes")]
        public async Task<ActionResult> ProductTypes()
        {
            try
            {
                var results = await _repository.GetProductTypesAsync();

                return Ok(results);
            }
            catch (Exception)
            {

                return StatusCode(StatusCodes.Status500InternalServerError, "Internal Server Error. Please contact support.");
            }
        }

    }
}
