

### **Question Statement**

**Task Title:** *Loading and Displaying IP Addresses Using a Doubly Linked List in C++*

**Problem Description:**
You are provided with a text file named **`ips.txt`** that contains **15 IP addresses** separated by commas (`,`). Your task is to write a **C++ program** that performs the following operations using a **doubly linked list** (without using STL containers like `std::list`):

1. **Read** all IP addresses from the file `ips.txt`.
2. **Insert** each IP address into a **doubly linked list** such that each node stores one IP address.
3. **Traverse and display** the list in **forward** direction (from head to tail).
4. **Traverse and display** the list in **reverse** direction (from tail to head).
5. **Ensure proper memory management** by freeing all nodes at the end of the program.

**File Format:**

* File name: `ips.txt`
* Content example (single line):

  ```
  192.168.1.10,10.0.0.5,172.16.0.1,203.0.113.5,198.51.100.23,8.8.8.8,8.8.4.4,192.0.2.45,10.10.10.10,172.20.14.2,52.214.10.7,34.102.136.180,185.199.108.153,13.35.66.1,44.240.20.10
  ```

**Expected Output Example:**

```
Forward traversal:
192.168.1.10 -> 10.0.0.5 -> 172.16.0.1 -> ... -> 44.240.20.10

Backward traversal:
44.240.20.10 -> 13.35.66.1 -> ... -> 192.168.1.10
```

**Instructions:**

* Define a `Node` structure with `ip`, `prev`, and `next` members.
* Implement functions for inserting, displaying (forward & backward), and freeing nodes.
* Demonstrate your understanding of file handling, string tokenization, and linked list traversal in C++.

---
