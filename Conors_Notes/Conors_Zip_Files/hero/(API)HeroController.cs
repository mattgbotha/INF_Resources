using Ionic_II.Models;
using Microsoft.AspNetCore.Components.Forms;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Reflection.Metadata.Ecma335;

namespace Ionic_II.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HeroController : ControllerBase
    {
        private readonly IHeroRepository _heroRepository;

        public HeroController(IHeroRepository HeroRepository)
        {
            _heroRepository = HeroRepository;
        }

        [HttpGet]
        [Route("GetAllHeroes")]
        public async Task<IActionResult> GetAllHeroes()
        {
            try
            {
                var results = await _heroRepository.GetAllHeroesAsync();
                return Ok(results);
            }
            catch (Exception)
            {
                return StatusCode(500,"Internal Server Error. Please contact support.");
            }
        }

        [HttpGet]
        [Route("GetHero/{heroId}")]
        public async Task<IActionResult> GetHero(int heroId)
        {
            try
            {
                var result = await _heroRepository.GetHeroAsync(heroId);

                if (result == null) return NotFound("Hero does not exist. You need to create it first");

                return Ok(result);
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error. Please contact support");
            }
        }
    }
}
