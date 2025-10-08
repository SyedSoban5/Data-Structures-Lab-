// LinkedListVisualizer.tsx
// ------------------------------------------------------------
// A single-file React app that visually simulates a Singly Linked List
// for teaching Data Structures labs. Includes: pushFront, pushBack,
// insertAt (index), popFront, popBack, deleteAt (index), search, reverse.
// Animated nodes, arrows, step logs, and inline error handling.
// ------------------------------------------------------------
// How to use locally (one quick way with Vite):
//   1) npm create vite@latest linked-list-visualizer -- --template react-ts
//   2) cd linked-list-visualizer && npm i
//   3) npm i framer-motion
//   4) (Optional) Setup Tailwind: https://tailwindcss.com/docs/guides/vite
//      Or remove Tailwind classes below and use plain CSS.
//   5) Replace src/App.tsx contents with this file content and export default component.
//   6) npm run dev
// Deploy on GitHub Pages / Vercel easily once it runs locally.

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";

// -----------------------------
// Linked List Core (TypeScript)
// -----------------------------
class LLNode {
  value: number;
  next: LLNode | null;
  id: string; // stable id for React keys / animations
  constructor(value: number) {
    this.value = value;
    this.next = null;
    this.id = Math.random().toString(36).slice(2);
  }
}

class LinkedList {
  head: LLNode | null = null;
  size = 0;

  toArray(): LLNode[] {
    const arr: LLNode[] = [];
    let cur = this.head;
    while (cur) {
      arr.push(cur);
      cur = cur.next;
    }
    return arr;
  }

  pushFront(value: number) {
    const node = new LLNode(value);
    node.next = this.head;
    this.head = node;
    this.size++;
  }

  pushBack(value: number) {
    const node = new LLNode(value);
    if (!this.head) {
      this.head = node;
      this.size++;
      return;
    }
    let cur = this.head;
    while (cur.next) cur = cur.next;
    cur.next = node;
    this.size++;
  }

  insertAt(value: number, index: number) {
    if (index <= 0 || !this.head) {
      this.pushFront(value);
      return;
    }
    let cur = this.head;
    let i = 0;
    while (cur && i < index - 1) {
      cur = cur.next!;
      i++;
    }
    if (!cur) {
      // index beyond length → push back
      this.pushBack(value);
      return;
    }
    const node = new LLNode(value);
    node.next = cur.next;
    cur.next = node;
    this.size++;
  }

  popFront(): number | null {
    if (!this.head) return null;
    const val = this.head.value;
    const del = this.head;
    this.head = this.head.next;
    del.next = null;
    this.size--;
    return val;
  }

  popBack(): number | null {
    if (!this.head) return null;
    if (!this.head.next) {
      const val = this.head.value;
      this.head = null;
      this.size--;
      return val;
    }
    let prev = this.head;
    let cur = this.head.next;
    while (cur && cur.next) {
      prev = cur;
      cur = cur.next;
    }
    const val = cur!.value;
    prev.next = null;
    this.size--;
    return val;
  }

  deleteAt(index: number): number | null {
    if (!this.head) return null;
    if (index <= 0) return this.popFront();
    let prev = this.head;
    let cur = this.head.next;
    let i = 1;
    while (cur && i < index) {
      prev = cur;
      cur = cur.next;
      i++;
    }
    if (!cur) return null; // index out of range
    const val = cur.value;
    prev.next = cur.next;
    cur.next = null;
    this.size--;
    return val;
  }

  search(value: number): number {
    let cur = this.head;
    let index = 0;
    while (cur) {
      if (cur.value === value) return index;
      cur = cur.next;
      index++;
    }
    return -1;
  }

  reverse() {
    let prev: LLNode | null = null;
    let cur = this.head;
    while (cur) {
      const nxt = cur.next;
      cur.next = prev;
      prev = cur;
      cur = nxt;
    }
    this.head = prev;
  }
}

// -----------------------------
// React UI
// -----------------------------

type Op =
  | { type: "pushFront"; value: number }
  | { type: "pushBack"; value: number }
  | { type: "insertAt"; value: number; index: number }
  | { type: "popFront" }
  | { type: "popBack" }
  | { type: "deleteAt"; index: number }
  | { type: "search"; value: number }
  | { type: "reverse" };

function useLinkedList() {
  const [ll, setLL] = React.useState(() => new LinkedList());
  const [arr, setArr] = React.useState<LLNode[]>([]);
  const [highlightIndex, setHighlightIndex] = React.useState<number | null>(
    null
  );
  const [log, setLog] = React.useState<string[]>([]);

  const sync = React.useCallback(
    (msg?: string) => {
      setArr(ll.toArray());
      if (msg) setLog((L) => [msg, ...L].slice(0, 50));
    },
    [ll]
  );

  const run = (op: Op) => {
    switch (op.type) {
      case "pushFront":
        ll.pushFront(op.value);
        setHighlightIndex(0);
        sync(`pushFront(${op.value})`);
        break;
      case "pushBack":
        ll.pushBack(op.value);
        setHighlightIndex(ll.size - 1);
        sync(`pushBack(${op.value})`);
        break;
      case "insertAt":
        ll.insertAt(op.value, op.index);
        setHighlightIndex(Math.max(0, Math.min(op.index, ll.size - 1)));
        sync(`insertAt(value=${op.value}, index=${op.index})`);
        break;
      case "popFront": {
        const v = ll.popFront();
        setHighlightIndex(null);
        sync(`popFront() → ${v ?? "null"}`);
        break; }
      case "popBack": {
        const v = ll.popBack();
        setHighlightIndex(null);
        sync(`popBack() → ${v ?? "null"}`);
        break; }
      case "deleteAt": {
        const v = ll.deleteAt(op.index);
        setHighlightIndex(null);
        sync(`deleteAt(${op.index}) → ${v ?? "null"}`);
        break; }
      case "search": {
        const idx = ll.search(op.value);
        setHighlightIndex(idx >= 0 ? idx : null);
        sync(`search(${op.value}) → index ${idx}`);
        break; }
      case "reverse":
        ll.reverse();
        setHighlightIndex(null);
        sync(`reverse()`);
        break;
    }
  };

  const reset = () => {
    const fresh = new LinkedList();
    setLL(fresh);
    setArr([]);
    setLog([]);
    setHighlightIndex(null);
  };

  // seed sample data on first mount
  React.useEffect(() => {
    ll.pushBack(10);
    ll.pushBack(20);
    ll.pushBack(30);
    setArr(ll.toArray());
  }, []);

  return { arr, run, reset, log, highlightIndex };
}

function Arrow() {
  return (
    <svg width="54" height="24" viewBox="0 0 54 24" className="mx-2">
      <line x1="0" y1="12" x2="42" y2="12" strokeWidth="2" stroke="currentColor" />
      <polygon points="42,6 42,18 54,12" fill="currentColor" />
    </svg>
  );
}

function NodeCard({
  value,
  isHead,
  isTail,
  highlight,
}: {
  value: number;
  isHead: boolean;
  isTail: boolean;
  highlight?: boolean;
}) {
  return (
    <motion.div
      layout
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className={`min-w-[110px] px-4 py-3 rounded-2xl shadow-md border flex flex-col items-center justify-center select-none bg-white ${
        highlight ? "ring-4 ring-blue-400" : ""
      }`}
    >
      <div className="text-xs uppercase tracking-wider text-gray-500">
        {isHead ? "HEAD" : isTail ? "TAIL" : "NODE"}
      </div>
      <div className="text-2xl font-bold">{value}</div>
      <div className="text-[10px] text-gray-400 mt-1">next →</div>
    </motion.div>
  );
}

function Toolbar({ onRun }: { onRun: (op: Op) => void }) {
  const [value, setValue] = React.useState<string>("");
  const [index, setIndex] = React.useState<string>("");

  const parseIntSafe = (s: string) => {
    const n = Number(s);
    return Number.isFinite(n) ? Math.trunc(n) : NaN;
  };

  return (
    <div className="grid md:grid-cols-2 gap-3">
      <div className="flex flex-wrap items-end gap-2 p-3 rounded-xl border bg-white">
        <div className="flex flex-col">
          <label className="text-xs text-gray-500">Value</label>
          <input
            className="px-3 py-2 rounded-md border focus:outline-none"
            placeholder="e.g. 42"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label className="text-xs text-gray-500">Index</label>
          <input
            className="px-3 py-2 rounded-md border focus:outline-none"
            placeholder="e.g. 2"
            value={index}
            onChange={(e) => setIndex(e.target.value)}
          />
        </div>
        <button
          className="px-3 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
          onClick={() => {
            const v = parseIntSafe(value);
            if (Number.isNaN(v)) return alert("Enter a numeric value");
            onRun({ type: "pushFront", value: v });
          }}
        >
          pushFront
        </button>
        <button
          className="px-3 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
          onClick={() => {
            const v = parseIntSafe(value);
            if (Number.isNaN(v)) return alert("Enter a numeric value");
            onRun({ type: "pushBack", value: v });
          }}
        >
          pushBack
        </button>
        <button
          className="px-3 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
          onClick={() => {
            const v = parseIntSafe(value);
            const i = parseIntSafe(index);
            if (Number.isNaN(v) || Number.isNaN(i))
              return alert("Enter numeric value and index");
            onRun({ type: "insertAt", value: v, index: i });
          }}
        >
          insertAt
        </button>
      </div>

      <div className="flex flex-wrap items-end gap-2 p-3 rounded-xl border bg-white">
        <button
          className="px-3 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700"
          onClick={() => onRun({ type: "popFront" })}
        >
          popFront
        </button>
        <button
          className="px-3 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700"
          onClick={() => onRun({ type: "popBack" })}
        >
          popBack
        </button>
        <button
          className="px-3 py-2 rounded-lg bg-rose-600 text-white hover:bg-rose-700"
          onClick={() => {
            const i = Number.isFinite(Number(index)) ? Number(index) : NaN;
            if (Number.isNaN(i)) return alert("Enter an index for deleteAt");
            onRun({ type: "deleteAt", index: i });
          }}
        >
          deleteAt
        </button>
        <button
          className="px-3 py-2 rounded-lg bg-slate-800 text-white hover:bg-slate-900"
          onClick={() => onRun({ type: "reverse" })}
        >
          reverse
        </button>
        <div className="flex grow" />
        <button
          className="px-3 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700"
          onClick={() => {
            const v = Number.isFinite(Number(value)) ? Number(value) : NaN;
            if (Number.isNaN(v)) return alert("Enter a numeric value to search");
            onRun({ type: "search", value: v });
          }}
        >
          search
        </button>
      </div>
    </div>
  );
}

export default function LinkedListVisualizer() {
  const { arr, run, reset, log, highlightIndex } = useLinkedList();

  return (
    <div className="min-h-screen w-full bg-gray-50 text-gray-900 p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        <header className="flex items-center justify-between">
          <h1 className="text-2xl md:text-3xl font-bold">Linked List Visualizer</h1>
          <button
            className="px-4 py-2 rounded-lg bg-gray-900 text-white hover:bg-black"
            onClick={reset}
          >
            Reset
          </button>
        </header>

        <p className="text-sm md:text-base text-gray-600">
          Demonstration of a <b>Singly Linked List</b> with animated operations. Use the
          controls to add, insert, delete, search, and reverse. This simulation
          keeps true linked list semantics internally and renders the current
          chain of nodes horizontally with arrows.
        </p>

        <Toolbar onRun={run} />

        {/* Visual Chain */}
        <div className="overflow-x-auto border rounded-2xl bg-white p-4">
          <div className="flex items-center">
            <span className="mr-3 text-xs text-gray-500">HEAD</span>
            <div className="flex items-center">
              <AnimatePresence initial={false}>
                {arr.map((n, i) => (
                  <React.Fragment key={n.id}>
                    <NodeCard
                      value={n.value}
                      isHead={i === 0}
                      isTail={i === arr.length - 1}
                      highlight={highlightIndex === i}
                    />
                    {i < arr.length - 1 ? <Arrow /> : null}
                  </React.Fragment>
                ))}
              </AnimatePresence>
            </div>
            <span className="ml-3 text-xs text-gray-500">NULL</span>
          </div>
        </div>

        {/* Logs */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="border rounded-2xl bg-white p-4">
            <h2 className="font-semibold mb-2">Operation Log</h2>
            <ol className="text-sm space-y-1 list-decimal list-inside max-h-64 overflow-auto">
              {log.length === 0 && (
                <li className="text-gray-400">(no operations yet)</li>
              )}
              {log.map((line, idx) => (
                <li key={idx}>{line}</li>
              ))}
            </ol>
          </div>

          <div className="border rounded-2xl bg-white p-4">
            <h2 className="font-semibold mb-2">Notes for Students</h2>
            <ul className="text-sm space-y-1 list-disc ml-4">
              <li>pushFront: O(1) — adjust head pointer only.</li>
              <li>pushBack: O(n) — traverse to the tail.</li>
              <li>insertAt(i): O(n) — traverse to i-1, relink pointers.</li>
              <li>popFront: O(1) — move head → head.next.</li>
              <li>popBack/deleteAt: O(n) — traverse to second-last / i-1.</li>
              <li>search: O(n) — sequential traversal; no random access.</li>
              <li>reverse: O(n) in-place using three pointers (prev, cur, nxt).</li>
            </ul>
          </div>
        </div>

        <footer className="text-xs text-gray-500">
          Built for Data Structures Lab — Singly Linked List (C++ concept visualized in React). Feel free to fork and extend.
        </footer>
      </div>
    </div>
  );
}
