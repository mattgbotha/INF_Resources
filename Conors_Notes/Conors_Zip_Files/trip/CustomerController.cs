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
    // Define the main controller class named "CustomerController" that inherits from "ControllerBase"
    public class CustomerController : ControllerBase
    {
        // Declare a private readonly field for the IRepository interface
        private readonly IRepository _repository;

        // Define the constructor for the CustomerController, which takes an IRepository implementation as a dependency
        public CustomerController(IRepository repository)
        {
            _repository = repository;
        }

        // Define a GET endpoint for fetching all customers
        [HttpGet]
        [Route("GetAllCustomers")]
        public async Task<IActionResult> GetAllCustomers()
        {
            try
            {
                // Call the GetAllCustomersAsync method from the repository and return the result as a JSON object
                var results = await _repository.GetAllCustomersAsync();
                return Ok(results);
            }
            catch (Exception)
            {
                // If any error occurs, return a 500 Internal Server Error response with a custom message
                return StatusCode(500, "Internal Server Error. Please contact support.");
            }
        }

        // Define a GET endpoint for fetching a single customer by ID
        [HttpGet]
        [Route("GetCustomer/{custId}")]
        public async Task<IActionResult> GetCustomerAsync(int custId)
        {
            try
            {
                // Call the GetCustomerAsync method from the repository with the provided customer ID
                var result = await _repository.GetCustomerAsync(custId);

                // If the result is null, return a 404 Not Found response with a custom message
                if (result == null) return NotFound("Customer does not exist");

                // Otherwise, return the result as a JSON object
                return Ok(result);
            }
            catch (Exception)
            {
                // If any error occurs, return a 500 Internal Server Error response with a custom message
                return StatusCode(500, "Internal Server Error. Please contact support");
            }
        }

        // Define a POST endpoint for adding a new customer
        [HttpPost]
        [Route("AddCustomer")]
        public async Task<IActionResult> AddCustomer(CustomerViewModel cvm)
        {
            // Create a new Customer instance from the provided CustomerViewModel
            var customer = new Customer { 
                LastName = cvm.LastName, 
                FirstName = cvm.FirstName, 
                Address = cvm.Address, 
                City = cvm.City, 
                State = cvm.State, 
                PostalCode = cvm.PostalCode, 
                PhoneNumber = cvm.PhoneNumber };

            try
            {
                // Call the Add method from the repository to add the new customer
                _repository.Add(customer);
                // Save the changes asynchronously
                await _repository.SaveChangesAsync();
            }
            catch (Exception)
            {
                // If any error occurs, return a 400 Bad Request response with a custom message
                return BadRequest("Invalid transaction");
            }

            // Return the newly created customer as a JSON object
            return Ok(customer);
        }

        // Define a PUT endpoint for editing an existing customer by ID
        [HttpPut]
        [Route("EditCustomer/{custId}")]
        public async Task<ActionResult<CustomerViewModel>> EditCustomer(int custId, CustomerViewModel customerModel)
        {
            try
            {
                // Call the GetCustomerAsync method from the repository with the provided customer ID
                var existingCustomer = await _repository.GetCustomerAsync(custId);
                // If the existing customer is not found, return a 404 Not Found response with a custom message
                if (existingCustomer == null) return NotFound($"The customer does not exist");

                // Update the existing customer's properties with the new values from the customer model
                existingCustomer.LastName = customerModel.LastName;
                existingCustomer.FirstName = customerModel.FirstName;
                existingCustomer.Address = customerModel.Address;
                existingCustomer.City = customerModel.City;
                existingCustomer.State = customerModel.State;
                existingCustomer.PostalCode = customerModel.PostalCode;
                existingCustomer.PhoneNumber = customerModel.PhoneNumber;

                // Save the changes to the repository asynchronously
                if (await _repository.SaveChangesAsync())
                {
                    // If the save is successful, return the updated customer as a JSON object
                    return Ok(existingCustomer);
                }
            }
            catch (Exception)
            {
                // If any error occurs, return a 500 Internal Server Error response with a custom message
                return StatusCode(500, "Internal Server Error. Please contact support.");
            }
            // If the request is invalid, return a 400 Bad Request response with a custom message
            return BadRequest("Your request is invalid.");
        }

        // Define a DELETE endpoint for deleting an existing customer by ID
        [HttpDelete]
        [Route("DeleteCustomer/{custId}")]
        public async Task<IActionResult> DeleteCustomer(int custId)
        {
            try
            {
                // Call the GetCustomerAsync method from the repository with the provided customer ID
                var existingCustomer = await _repository.GetCustomerAsync(custId);

                // If the existing customer is not found, return a 404 Not Found response with a custom message
                if (existingCustomer == null) return NotFound($"The customer does not exist");

                // Call the Delete method from the repository to delete the existing customer
                _repository.Delete(existingCustomer);

                // Save the changes to the repository asynchronously
                if (await _repository.SaveChangesAsync()) return Ok(existingCustomer);

            }
            catch (Exception)
            {
                // If any error occurs, return a 500 Internal Server Error response with a custom message
                return StatusCode(500, "Internal Server Error. Please contact support.");
            }
            // If the request is invalid, return a 400 Bad Request response with a custom message
            return BadRequest("Your request is invalid.");
        }
    }
}

