using System.ComponentModel.DataAnnotations;

namespace API2Practice.ViewModel
{
    public class CustomerViewModel
    {
        public string LastName { get; set; } = string.Empty;

        public string FirstName { get; set; } = string.Empty;
        public string? Address { get; set; }
        public string? City { get; set; }
        public string? State { get; set; }
        public string? PostalCode { get; set; }
        public string PhoneNumber { get; set; } = string.Empty;
    }
}
