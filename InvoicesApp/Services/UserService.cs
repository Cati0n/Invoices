using System;
using System.Collections.Generic;
using InvoicesApp.Entity;
using InvoicesApp.Interfaces;
using InvoicesApp.Models;

namespace InvoicesApp.Services
{
  public class UserService : IUserService
  {
    private readonly ApplicationDbContext _dbContext = new ApplicationDbContext();

    public void AddUser(RegisterUserIncomeModel userIncomeModel)
    {
      throw new NotImplementedException();
    }

    public UserViewModel GetUserInfo(Guid userId)
    {
      throw new NotImplementedException();
    }

    public void DeleteUser(Guid userId)
    {
      throw new NotImplementedException();
    }

    public void UpdateUserInfo(Guid userId)
    {
      throw new NotImplementedException();
    }

    public List<UserViewModel> GetAllUsers()
    {
      throw new NotImplementedException();
    }
  }
}