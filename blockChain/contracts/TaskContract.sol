// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract TaskContract {
  event taskAdded(address recepient, uint taskId);
  event taskDeleted(uint taskId);

  struct Task{
    uint256 id;
    string title;
    bool isDeleted;
  }

  Task[] private tasks;
  mapping(uint256 => address) taskToOwner;

  function addTask(string memory title) external{
    uint256 id = tasks.length;
    tasks.push(Task(id, title, false));
    taskToOwner[id] = msg.sender;
    emit taskAdded(msg.sender, id);
  }

  function getMyTasks() external view returns (Task[] memory){
    Task[] memory temp = new Task[](tasks.length);
    uint256 count = 0;
    for (uint256 i = 0; i < tasks.length; i++) {
      if(taskToOwner[i] == msg.sender && tasks[i].isDeleted == false){
        temp[count] = tasks[i];
        count++;
      }
    }
    Task[] memory result = new Task[](count);
    for (uint256 i = 0; i < count; i++) {
        result[i] = temp[i];
    }
    
    return result;
  }

  function deleteTask(uint256 id) external {
    if(taskToOwner[id] == msg.sender){
      tasks[id].isDeleted = true;
      emit taskDeleted(id);
    }
  }

}
