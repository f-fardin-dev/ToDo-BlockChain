// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract TaskContract {
  event taskAdded(address recepient, uint taskId);
  event taskDeleted(uint taskId);

  struct Task{
    uint id;
    string title;
    bool isDeleted;
  }

  Task[] private tasks;
  mapping(uint256 => address) taskToOwner;

  function addTask(string memory title) external{
    uint id = tasks.length;
    tasks.push(Task(id, title, true));
    taskToOwner[id] = msg.sender;
    emit taskAdded(msg.sender, id);
  }

  function getMyTasks() external view returns (Task[] memory){
    Task[] memory result;
    for (uint256 i = 0; i < tasks.length; i++) {
      if(taskToOwner[i] == msg.sender && tasks[i].isDeleted == false){
        result[i] = tasks[i];
      }
    }
    return result;
  }

  function deleteTask(uint id) external {
    if(taskToOwner[id] == msg.sender){
      tasks[id].isDeleted = true;
      emit taskDeleted(id);
    }
  }

}
