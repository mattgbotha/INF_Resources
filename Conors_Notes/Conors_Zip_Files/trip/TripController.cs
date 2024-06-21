// Import the necessary namespaces for the API controller
using API2Practice.Models;
using API2Practice.ViewModel;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

// Define the namespace for the API controllers
namespace API2Practice.Controllers
{
    // Set the route for the API controller
    [Route("api/[controller]")]
    // Indicate that this class is an API controller
    [ApiController]
    // Define the main controller class named "TripController" that inherits from "ControllerBase"
    public class TripController : ControllerBase
    {
        // Declare a private readonly field for the IRepository interface
        private readonly IRepository _repository;

        // Define the constructor for the TripController, which takes an IRepository implementation as a dependency
        public TripController(IRepository repository)
        {
            _repository = repository;
        }

        // Define a POST endpoint for adding a guide to a new trip
        [HttpPost]
        [Route("AddTripGuide/{guideNum}")]
        public async Task<IActionResult> AddTripGuide(string guideNum, TripViewModel tvm)
        {
            // Create a new Trip instance from the provided TripViewModel
            var trip = new Trip { 
                TripName = tvm.TripName, 
                Startlocation = tvm.Startlocation, 
                State = tvm.State, 
                Distance = tvm.Distance, 
                MaxGroupSize = tvm.MaxGroupSize, 
                Type = tvm.Type, 
                Season = tvm.Season };

            // Call the GetGuideAsync method from the repository with the provided guide number
            var guide = await _repository.GetGuideAsync(guideNum);
            // If the guide is not found, return a 404 Not Found response with a custom message
            if (guide == null) return NotFound($"The guide does not exist");

            try
            {
                // Add the guide to the trip's Guides collection
                trip.Guides.Add(guide);
                // Call the Add method from the repository to add the new trip
                _repository.Add(trip);
                // Save the changes asynchronously
                await _repository.SaveChangesAsync();
            }
            catch (Exception)
            {
                // If any error occurs, return a 400 Bad Request response with a custom message
                return BadRequest("Invalid transaction");
            }

            // Return a 200 OK response
            return Ok();
        }

        // Define a PUT endpoint for updating the guide of an existing trip
        [HttpPut]
        [Route("EditTripGuide/{guideNum}/{tripId}")]
        public async Task<IActionResult> EditTripGuide(string guideNum, int tripId)
        {
            // Call the GetTripAsync method from the repository with the provided trip ID
            var trip = await _repository.GetTripAsync(tripId);
            // If the trip is not found, return a 404 Not Found response with a custom message
            if (trip == null) return NotFound($"The trip does not exist");

            // Call the GetGuideAsync method from the repository with the provided guide number
            var guide = await _repository.GetGuideAsync(guideNum);
            // If the guide is not found, return a 404 Not Found response with a custom message
            if (guide == null) return NotFound($"The guide does not exist");

            try
            {
                // Remove all guides from the trip's Guides collection
                var guidesToRemove = trip.Guides.ToList();
                guidesToRemove.ForEach(g => trip.Guides.Remove(g));

                // Add the new guide to the trip's Guides collection
                trip.Guides.Add(guide);
                // Save the changes asynchronously
                await _repository.SaveChangesAsync();
            }
            catch (Exception)
            {
                // If any error occurs, return a 400 Bad Request response with a custom message
                return BadRequest("Invalid transaction");
            }

            // Return a 200 OK response
            return Ok();
        }
    }
}

