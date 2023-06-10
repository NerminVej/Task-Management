package com.mygroup.TaskManagement.services;

import com.mygroup.TaskManagement.models.User;

public class UserResponse {
    private boolean success;
    private User user;

    public UserResponse(boolean success, User user) {
        this.success = success;
        this.user = user;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public boolean checkSuccess(boolean success){
        if (success == true){
            return true;
        }
        else {
            return false;
        }
    }

}
