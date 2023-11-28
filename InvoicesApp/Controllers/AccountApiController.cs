using System;
using InvoicesApp.Models;
using Microsoft.AspNetCore.Mvc;

namespace InvoicesApp.Controllers
{
    [Route("api/account")]
    [ApiController]
    public class AccountApiController : ControllerBase
    {
      [HttpPost]
      public IActionResult AddUser([FromBody] RegisterUserIncomeModel userIncomeModel)
      {
      if (!ModelState.IsValid)
      {
        throw new ApplicationException("Wrong userIncomeModel values provided");
      }

      return Ok();
      }

      [HttpPost]
      public IActionResult UpdateUser([FromBody] RegisterUserIncomeModel userIncomeModel)
      {
        if (!ModelState.IsValid)
        {
          throw new ApplicationException("Wrong userIncomeModel values provided");
        }

        return Ok();
      }

    [HttpGet]
      [Route("account/{userId}")]
      public IActionResult GetUserInfo([FromRoute] Guid userId)
      {
        if (!ModelState.IsValid)
        {
          throw new ApplicationException("Wrong userIncomeModel values provided");
        }

        return Ok();
      }

      [HttpGet]
      public IActionResult Users()
      {
        if (!ModelState.IsValid)
        {
          throw new ApplicationException("Wrong userIncomeModel values provided");
        }

        return Ok();
      }

      [HttpDelete]
      [Route("delete/{userId}")]
    public IActionResult Delete([FromRoute] Guid userId)
      {
        if (!ModelState.IsValid)
        {
          throw new ApplicationException("Wrong userIncomeModel values provided");
        }

        return Ok();
      }
  }
}
