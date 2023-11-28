using System;
using System.Collections.Generic;
using InvoicesApp.Models;

namespace InvoicesApp.Interfaces
{
  public interface IUserService
  {
    void AddUser(RegisterUserIncomeModel userIncomeModel);

    UserViewModel GetUserInfo(Guid userId);

    void DeleteUser(Guid userId);
      
    void UpdateUserInfo(Guid userId);

    List<UserViewModel> GetAllUsers();
  }
}