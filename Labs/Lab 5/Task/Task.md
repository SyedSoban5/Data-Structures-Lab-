

# 🚌 Data Structures Lab Task – Linked List (BRT Peshawar Use Case)

## 📌 Overview

This lab task demonstrates how a **singly linked list** can be applied in a **real-world scenario**.
We are modeling the **passenger queue management system of BRT Peshawar**.
Each passenger is represented as a **node**, and we will implement basic linked list operations to simulate how passengers board the bus.

---

## 🎯 Learning Objectives

By completing this lab, students will:

* Understand how to define a **Node structure** in C++.
* Implement a **Linked List class** with `head` pointer.
* Practice common linked list operations (insertions, deletion).
* Apply linked lists to a **real-world problem**.

---

## 📖 Problem Statement

The **BRT Peshawar system** manages passengers boarding buses at different stations.
We will implement a **Passenger Queue Manager** where:

* **`insertAtBeginning(int id)`** → An **emergency passenger** (VIP, medical case) joins the **front of the queue**.
* **`insertAtEnd(int id)`** → A **normal passenger** joins at the **end of the queue**.
* **`insertAtPosition(int id, int pos)`** → A **special booking passenger** joins at a **specific position** in the queue.
* **`deleteFromBeginning()`** → The **first passenger boards the bus** and is removed from the queue.

---

## 🛠 Requirements

1. Define a `struct Node` to represent a passenger (Passenger ID + pointer).
2. Create a `LinkedList` class that stores a `head` pointer.
3. Implement all required functions:

   * `insertAtBeginning(int value)`
   * `insertAtEnd(int value)`
   * `insertAtPosition(int value, int pos)`
   * `deleteFromBeginning()`
4. Write a `main()` function to **simulate a BRT queue scenario**.

---

## 🧑‍💻 Simulation Scenario

Your program should follow these steps:

1. Start with an **empty queue**.
2. Add **3 passengers at the end** (normal boarding).
3. Add **1 passenger at the beginning** (emergency boarding).
4. Add **1 passenger at position 2** (special booking).
5. Print the current queue.
6. Remove the **first passenger** (bus arrives, passenger boards).
7. Print the updated queue.

---

## 📌 Expected Output

```text
Initial Queue after adding passengers:
101 -> 102 -> 103
After adding an emergency passenger at beginning:
999 -> 101 -> 102 -> 103
After inserting special booking passenger at position 2:
999 -> 101 -> 555 -> 102 -> 103
After first passenger boards (deletion):
101 -> 555 -> 102 -> 103
```

---

## 📂 File Structure

```
📦 Data-Structures-Lab
 ┣ 📜 README.md           # Instructions (this file)
 ┣ 📜 brt_linkedlist.cpp  # Your main source code
```

---

## 🚀 Starter Template

```cpp
#include <iostream>
using namespace std;

// Node structure
struct Node {
    int data;
    Node* next;
    Node(int d) : data(d), next(nullptr) {}
};

// LinkedList class
class LinkedList {
private:
    Node* head;
public:
    LinkedList() : head(nullptr) {}
    ~LinkedList();

    void insertAtBeginning(int value);
    void insertAtEnd(int value);
    void insertAtPosition(int value, int pos);
    bool deleteFromBeginning(int* removedValue = nullptr);
    void display() const;
};

// TODO: Implement functions here...

int main() {
    LinkedList list;

    // Step 1: Add 3 passengers at the end
    list.insertAtEnd(101);
    list.insertAtEnd(102);
    list.insertAtEnd(103);
    cout << "Initial Queue after adding passengers:\n";
    list.display();

    // Step 2: Emergency passenger at beginning
    list.insertAtBeginning(999);
    cout << "After adding an emergency passenger at beginning:\n";
    list.display();

    // Step 3: Special booking passenger at position 2
    list.insertAtPosition(555, 2);
    cout << "After inserting special booking passenger at position 2:\n";
    list.display();

    // Step 4: First passenger boards (delete from beginning)
    int removed;
    list.deleteFromBeginning(&removed);
    cout << "After first passenger boards (deletion):\n";
    list.display();

    return 0;
}
```

---

## ✅ Deliverables

* Complete your `.cpp` file with all functions implemented.
* Upload your work to **your own GitHub repository**.
* Share the **repository link on Google Classroom**.
* **Important:** Submissions must be your **own original work**.

  * 🚫 **No AI-generated code** is allowed.
  * Plagiarized work will result in zero marks.

