using Microsoft.AspNetCore.Mvc;

namespace InvoicesApp.Controllers
{
    [Route("~/account/[action]")]
    public class AccountViewController : Controller
    {
        public IActionResult Login()
        {
            return View();
        }
        public IActionResult Register()
        {
            return View();
        }
        public IActionResult Reset()
        {
            return View();
        }
        public IActionResult Settings()
        {
            return View();
        }
    }
}
