
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Notification, UserRole } from "@/lib/types";
import { Bell, CheckCheck, Info, AlertTriangle, CheckCircle, XCircle } from "lucide-react";

interface NotificationListProps {
  role: UserRole;
}

const NotificationList: React.FC<NotificationListProps> = ({ role }) => {
  // Mock notifications based on user role
  const getMockNotifications = (role: UserRole): Notification[] => {
    const baseNotifications: Notification[] = [
      {
        id: "1",
        title: "System Maintenance",
        message: "System maintenance scheduled for tonight at 2 AM.",
        read: false,
        createdAt: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
        type: "info",
      },
      {
        id: "2",
        title: "Profile Updated",
        message: "Your profile information was updated successfully.",
        read: true,
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3 hours ago
        type: "success",
      },
    ];

    // Role-specific notifications
    switch (role) {
      case "master":
        return [
          {
            id: "m1",
            title: "New Admin Added",
            message: "A new admin user has been added to the system.",
            read: false,
            createdAt: new Date(Date.now() - 1000 * 60 * 15), // 15 minutes ago
            type: "info",
          },
          {
            id: "m2",
            title: "System Alert",
            message: "Multiple failed login attempts detected.",
            read: false,
            createdAt: new Date(Date.now() - 1000 * 60 * 45), // 45 minutes ago
            type: "warning",
          },
          ...baseNotifications,
        ];

      case "admin":
        return [
          {
            id: "a1",
            title: "New Manager Request",
            message: "There is a pending request to promote a user to manager.",
            read: false,
            createdAt: new Date(Date.now() - 1000 * 60 * 20), // 20 minutes ago
            type: "info",
          },
          {
            id: "a2",
            title: "User Report",
            message: "Weekly user activity report is now available.",
            read: true,
            createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
            type: "info",
          },
          ...baseNotifications,
        ];

      case "manager":
        return [
          {
            id: "mg1",
            title: "Team Performance",
            message: "Monthly team performance report is ready for review.",
            read: false,
            createdAt: new Date(Date.now() - 1000 * 60 * 25), // 25 minutes ago
            type: "info",
          },
          {
            id: "mg2",
            title: "Resource Request",
            message: "Team leader has requested additional resources.",
            read: false,
            createdAt: new Date(Date.now() - 1000 * 60 * 90), // 1.5 hours ago
            type: "info",
          },
          ...baseNotifications,
        ];

      case "tl":
        return [
          {
            id: "t1",
            title: "Task Assignment",
            message: "New task has been assigned to your team.",
            read: false,
            createdAt: new Date(Date.now() - 1000 * 60 * 10), // 10 minutes ago
            type: "info",
          },
          {
            id: "t2",
            title: "Project Deadline",
            message: "Project A deadline has been extended by 3 days.",
            read: true,
            createdAt: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
            type: "success",
          },
          ...baseNotifications,
        ];

      case "user":
      default:
        return [
          {
            id: "u1",
            title: "Task Assignment",
            message: "You have been assigned a new task by your team leader.",
            read: false,
            createdAt: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
            type: "info",
          },
          ...baseNotifications,
        ];
    }
  };

  const [notifications, setNotifications] = useState(getMockNotifications(role));

  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === id
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(
      notifications.map((notification) => ({ ...notification, read: true }))
    );
  };

  const getTimeAgo = (date: Date) => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    let interval = seconds / 31536000;
  
    if (interval > 1) {
      return Math.floor(interval) + " years ago";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return Math.floor(interval) + " months ago";
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return Math.floor(interval) + " days ago";
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return Math.floor(interval) + " hours ago";
    }
    interval = seconds / 60;
    if (interval > 1) {
      return Math.floor(interval) + " minutes ago";
    }
    return Math.floor(seconds) + " seconds ago";
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "info":
        return <Info className="h-5 w-5 text-blue-400" />;
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-amber-400" />;
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-400" />;
      case "error":
        return <XCircle className="h-5 w-5 text-red-400" />;
      default:
        return <Bell className="h-5 w-5 text-blue-400" />;
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <Card className="w-full card-gradient">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-xl flex items-center gap-2">
            <Bell className="h-5 w-5" /> Notifications
            {unreadCount > 0 && (
              <span className="inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-primary rounded-full">
                {unreadCount}
              </span>
            )}
          </CardTitle>
          <CardDescription>
            Stay updated with the latest information
          </CardDescription>
        </div>
        {unreadCount > 0 && (
          <Button variant="outline" size="sm" onClick={markAllAsRead}>
            <CheckCheck className="h-4 w-4 mr-1" /> Mark all as read
          </Button>
        )}
      </CardHeader>
      <CardContent>
        {notifications.length === 0 ? (
          <div className="text-center py-6">
            <Bell className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
            <p className="text-muted-foreground">No notifications</p>
          </div>
        ) : (
          <div className="space-y-4">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 border rounded-lg transition-colors ${
                  notification.read
                    ? "bg-secondary/30"
                    : "bg-secondary/70 border-primary/20"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="mt-1">
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h4 className="font-semibold">{notification.title}</h4>
                      <span className="text-xs text-muted-foreground">
                        {getTimeAgo(notification.createdAt)}
                      </span>
                    </div>
                    <p className="text-sm mt-1">{notification.message}</p>
                    {!notification.read && (
                      <Button
                        variant="link"
                        size="sm"
                        className="p-0 h-auto mt-1 text-xs"
                        onClick={() => markAsRead(notification.id)}
                      >
                        Mark as read
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default NotificationList;
