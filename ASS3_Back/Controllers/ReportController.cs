using Assignment3_Backend.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Dynamic;

namespace Assignment3_Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReportController : ControllerBase
    {

        private readonly IRepository _repository;
        public ReportController(IRepository repository)
        {
            _repository = repository;
        }

        [HttpGet]
        [Route("ProductsReport")]
        public async Task<ActionResult<dynamic>> ProductsReport()
        {
            try
            {
                List<dynamic> productsreport = new List<dynamic>();

                var results = await _repository.GetProductsReportAsync();

                dynamic brands = results
                             .GroupBy(p => p.Brand.Name)
                             .Select(b => new
                             {
                                 Key = b.Key,
                                 ProductCount = b.Count()
                             ,
                                 ProductTotalCost = Math.Round((double)b.Sum(p => p.Price), 2)
                             ,
                                 ProductAverageCost = Math.Round((double)b.Average(p => p.Price), 2)
                             });

                dynamic productTypes = results
                             .GroupBy(p => p.ProductType.Name)
                             .Select(pt => new
                             {
                                 Key = pt.Key,
                                 ProductCount = pt.Count()
                             ,
                                 ProductTotalCost = Math.Round((double)pt.Sum(p => p.Price), 2)
                             ,
                                 ProductAverageCost = Math.Round((double)pt.Average(p => p.Price), 2)
                             });

                dynamic productList = results
                    .GroupBy(p => new { BrandName = p.Brand.Name, ProductTypeName = p.ProductType.Name, ProductName = p.Name })
                    .Select(p => new
                    {
                        p.Key.BrandName,
                        p.Key.ProductTypeName,
                        p.Key.ProductName,
                        ProductPrice = Math.Round((double)p.Sum(x => x.Price), 2)
                    });

                productsreport.Add(brands);
                productsreport.Add(productTypes);
                productsreport.Add(productList);
               

                return productsreport;
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal Server Error. Please contact support.");
            }
        }
    }
}
