// Import the necessary namespace for Entity Framework Core
using Microsoft.EntityFrameworkCore;

// Define the namespace for the application's models
namespace API2Practice.Models
{
    // Create the Repository class that implements IRepository
    public class Repository : IRepository
    {
        // Declare a private, read-only field for the AppDbContext instance
        private readonly AppDbContext _appDbContext;

        // Define a constructor that takes AppDbContext as a parameter and assigns it to the private field
        public Repository(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        // Implement the Add method for adding entities using the AppDbContext instance
        public void Add<T>(T entity) where T : class
        {
            _appDbContext.Add(entity);
        }

        // Implement the Delete method for deleting entities using the AppDbContext instance
        public void Delete<T>(T entity) where T : class
        {
            _appDbContext.Remove(entity);
        }

        // Implement the GetAllCustomersAsync method for retrieving all Customer entities
        public async Task<Customer[]> GetAllCustomersAsync()
        {
            IQueryable<Customer> query = _appDbContext.Customers;
            return await query.ToArrayAsync();
        }

        // Implement the GetCustomerAsync method for retrieving a specific Customer entity by its ID
        public async Task<Customer> GetCustomerAsync(int custId)
        {
            IQueryable<Customer> query = _appDbContext.Customers.Where(c => c.CustId == custId);
            return await query.FirstOrDefaultAsync();
        }

        // Implement the GetGuideAsync method for retrieving a specific Guide entity by its guide number
        public async Task<Guide> GetGuideAsync(string guideNum)
        {
            IQueryable<Guide> query = _appDbContext.Guides.Where(c => c.GuideNum == guideNum);
            return await query.FirstOrDefaultAsync();
        }

        // Implement the GetTripAsync method for retrieving a specific Trip entity by its ID
        // Include the related Guide entities in the query
        public async Task<Trip> GetTripAsync(int tripId)
        {
            IQueryable<Trip> query = _appDbContext.Trips.Include(g => g.Guides).Where(c => c.TripId == tripId);
            return await query.FirstOrDefaultAsync();
        }

        // Implement the SaveChangesAsync method for saving changes to the data store
        // Return true if at least one change has been saved, otherwise return false
        public async Task<bool> SaveChangesAsync()
        {
            return await _appDbContext.SaveChangesAsync() > 0;
        }
    }
}
