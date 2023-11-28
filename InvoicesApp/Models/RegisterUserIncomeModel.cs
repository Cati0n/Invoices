using System.ComponentModel.DataAnnotations;

namespace InvoicesApp.Models
{
  public class RegisterUserIncomeModel
  {
    [Required(ErrorMessage = "Email is not specified")]
    public string Email { get; set; }

    [Required(ErrorMessage = "Password is not specified")]
    [DataType(DataType.Password)]
    public string Password { get; set; }

    [DataType(DataType.Password)]
    [Compare("Password", ErrorMessage = "Passwords do not match")]
    public string ConfirmPassword { get; set; }
  }
}
