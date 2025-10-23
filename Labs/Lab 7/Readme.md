

# 🃏 Doubly Linked List – Practical Tasks

### Course: Data Structures & Algorithms

**Instructor:** Syed Shayan Ali Shah
**Topic:** Doubly Linked List (C++ Implementation)
**Objective:** Strengthen understanding of linked list traversal, insertion, deletion, and destructor logic through a practical, structured exercise.

---

## 📘 Overview

This project introduces the **Doubly Linked List (DLL)** data structure using C++.
Each node contains:

* `data` (integer)
* `next` pointer (points to next node)
* `prev` pointer (points to previous node)

The class `DLL` provides methods for inserting, displaying, searching, and deleting nodes.
Students will complete **four key tasks** focusing on memory management, pointer corrections, and debugging.

---

## 🧩 Class Structure

**Main Classes:**

1. `Node` → Represents one node of the linked list
2. `DLL` → Manages operations like insert, delete, search, and display

---

## 🧠 Tasks

### 🧱 **Task 1 – Create a Destructor**

**Location:** Inside `class DLL`

**Description:**
When the program ends, ensure that all nodes in the linked list are deleted and memory is released properly.

**Expected Output Behavior:**
When the destructor executes, it should print:

```
Deleting Node: [address or data]
All nodes deleted successfully!
```

---

### 📍 **Task 2 – Fix insertAtPos()**

**Location:** Function `insertAtPos(int position, int value)`

**Description:**
The current implementation fails when inserting the fifth or last element.
Update the logic so elements can be correctly inserted at any valid position — including the end of the list.

**Expected Behavior:**
After inserting five elements, all should appear correctly when displayed.

---

### 🗑️ **Task 3 – Fix deleteFB()**

**Location:** Function `deleteFB()`

**Description:**
The function deletes the first node but does not properly adjust the head pointer for the next node.
Modify it so that the new head points correctly to the remaining list after deletion.

**Expected Behavior:**

* First node is deleted successfully.
* The list remains properly linked.
* No invalid pointer access occurs.

---

### 🔍 **Task 4 – Fix DisplayNode()**

**Location:** Function `DisplayNode(Node* node)`

**Description:**
The function currently prints more than one node. Modify it so that it displays only the content of the single node passed to it.

**Expected Output Example:**

```
------------------------------------------------------
     Prev Address        |   Data   |     Next Address |   Node Address
------------------------------------------------------
  0x0000000000000000     |      25  |   0x0000000000AA |   0x0000000000CC
------------------------------------------------------
```

---

## 🖼️ Visual Representation

### 🔸 Before Insertion

```
NULL <- [10] <-> [20] <-> [30] -> NULL
```

### 🔸 After Inserting 40 at End

```
NULL <- [10] <-> [20] <-> [30] <-> [40] -> NULL
```

### 🔸 After Deleting the First Node

```
NULL <- [20] <-> [30] <-> [40] -> NULL
```

### 🔸 Node Structure

```
+---------------------+
| Prev | Data | Next |
+---------------------+
```

Each box represents one `Node`, and arrows represent pointer connections between nodes.

---

## 💻 Sample `main()` Test Plan

```cpp
int main() {
    DLL list;

    // Task 2: Insert elements
    list.insertAtBegin(10);
    list.insertAtEnd(20);
    list.insertAtEnd(30);
    list.insertAtEnd(40);

    // Insert at position 5
    list.insertAtPos(5, 50);
    list.Display();

    // Task 3: Delete from beginning
    list.deleteFB();
    list.Display();

    // Task 4: Search and display a specific node
    list.search(30);

    return 0;
}
```

---

## ⚙️ Compilation & Execution

### **Windows (using g++):**

```bash
g++ dll_tasks.cpp -o dll
dll
```

### **Linux/Mac:**

```bash
g++ dll_tasks.cpp -o dll
./dll
```

---

## 🧾 Submission Guidelines

1. Complete **all four tasks** in the given code.
2. Push the following files to your **GitHub repository**:

   * `dll_tasks.cpp`
   * `README.md`
   * Screenshot of program output.
3. Recommended folder structure:

   ```
   ├── DLL_Project/
   │   ├── dll_tasks.cpp
   │   ├── README.md
   │   └── output_screenshot.png
   ```

---

## 🏁 Learning Outcomes

By completing this project, students will:
✅ Understand **pointer manipulation** in linked lists
✅ Practice **memory management and destructors**
✅ Learn to debug **segmentation faults**
✅ Gain confidence in **real-world data structure implementation**

---

