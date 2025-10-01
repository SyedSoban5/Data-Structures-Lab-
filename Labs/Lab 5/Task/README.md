

# 📘 Linked List in C++ – Data Structures Lab

## 🔹 What is a Linked List?

A **Linked List** is a **linear data structure** where elements (called **nodes**) are connected using **pointers** instead of being stored in contiguous memory like arrays.

Each node has two parts:

* **Data** → stores the value (e.g., a number, a task ID, etc.)
* **Pointer (next)** → stores the address of the next node

The last node’s `next` is always `nullptr` (NULL), which means the end of the list.

👉 Example:

```
Head → [10|*] → [20|*] → [30|null]
```

---

## 🔹 Why use Linked Lists instead of Arrays?

| Feature           | Array                           | Linked List                        |
| ----------------- | ------------------------------- | ---------------------------------- |
| Memory Allocation | Fixed, contiguous               | Dynamic, scattered (flexible size) |
| Insert/Delete     | Costly (need shifting)          | Fast (just change pointers)        |
| Access            | O(1) direct via index           | O(n), must traverse sequentially   |
| Memory Usage      | Efficient (no pointer overhead) | Extra memory needed for pointer    |

👉 Use Linked Lists when:

* You don’t know the exact size of data in advance.
* Frequent **insertions and deletions** are needed.
* Memory fragmentation is acceptable compared to array resizing costs.

---

## 🔹 Node Structure

In C++, each node can be represented using a `struct`:

```cpp
struct Node {
    int data;       // value of the node
    Node* next;     // pointer to next node
    Node(int d) : data(d), next(nullptr) {}
};
```

---

## 🔹 LinkedList Class

We wrap the `Node` inside a `LinkedList` class to manage:

* A **head pointer** (starting point of the list).
* Operations (functions) to manipulate the list.

```cpp
class LinkedList {
private:
    Node* head;   // start of the list
public:
    LinkedList() : head(nullptr) {}    // constructor
    ~LinkedList();                     // destructor
    void insertAtBeginning(int value);
    void insertAtEnd(int value);
    void insertAtPosition(int value, int pos);
    bool deleteFromBeginning(int* removedValue = nullptr);
    void display() const;
};
```

---

## 🔹 Functions Explained in Detail

### 1️⃣ Insert at Beginning

```cpp
void insertAtBeginning(int value) {
    Node* node = new Node(value);
    node->next = head;   // link new node to current head
    head = node;         // move head to new node
}
```

**Explanation:**

* A new node is created.
* Its `next` points to the current head.
* Then head is updated to this new node.
  👉 The new node becomes the **first node** in the list.

---

### 2️⃣ Insert at End

```cpp
void insertAtEnd(int value) {
    Node* node = new Node(value);
    if (head == nullptr) {
        head = node;   // if list empty, new node is head
        return;
    }
    Node* cur = head;
    while (cur->next != nullptr) {
        cur = cur->next;
    }
    cur->next = node;  // link last node to new node
}
```

**Explanation:**

* If list is empty, new node is the head.
* Otherwise, traverse until the last node.
* Connect last node’s `next` to the new node.
  👉 The new node becomes the **last node**.

---

### 3️⃣ Insert at Position

```cpp
void insertAtPosition(int value, int pos) {
    if (pos == 0) {
        insertAtBeginning(value);
        return;
    }
    Node* cur = head;
    for (int i = 0; cur != nullptr && i < pos - 1; i++) {
        cur = cur->next;
    }
    if (cur == nullptr) {
        insertAtEnd(value);  // if position too big, insert at end
        return;
    }
    Node* node = new Node(value);
    node->next = cur->next;
    cur->next = node;
}
```

**Explanation:**

* If position = 0 → insert at beginning.
* Otherwise, traverse until the node before the desired position.
* Insert the new node in between.
  👉 Node is inserted at the exact position or at the end if position is out of range.

---

### 4️⃣ Delete from Beginning

```cpp
bool deleteFromBeginning(int* removedValue = nullptr) {
    if (head == nullptr) return false;   // empty list
    Node* temp = head;
    if (removedValue) *removedValue = temp->data;
    head = head->next;                   // move head forward
    delete temp;                         // free memory
    return true;
}
```

**Explanation:**

* Check if list is empty.
* Save the head node temporarily.
* Move head to next node.
* Delete the old head node.
  👉 Removes the **first node** in the list.

---

### 5️⃣ Display Function

```cpp
void display() const {
    Node* cur = head;
    while (cur) {
        cout << cur->data;
        if (cur->next) cout << " -> ";
        cur = cur->next;
    }
    cout << "\n";
}
```

**Explanation:**

* Start from head.
* Print each node’s data.
* Stop when `nullptr` is reached.

---

## 🔹 Destructor

```cpp
~LinkedList() {
    Node* cur = head;
    while (cur) {
        Node* nxt = cur->next;
        delete cur;
        cur = nxt;
    }
}
```

**Explanation:**

* Ensures all nodes are deleted when list object goes out of scope.
* Prevents **memory leaks**.

---

## ✅ Summary

* Linked List is a **dynamic data structure** where nodes are linked with pointers.
* Insertions and deletions are efficient compared to arrays.
* Useful for situations where **size changes frequently** or **insert/delete operations are frequent**.
* But slower for **random access**, since traversal is required.

