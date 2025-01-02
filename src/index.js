import { Terminal } from "@xterm/xterm";
import { FitAddon } from "@xterm/addon-fit";

var term = new Terminal();
const fitAddon = new FitAddon();
term.loadAddon(fitAddon);

term.open(document.getElementById("terminal"));
term.write("Hello from \x1B[1;3;31mxterm.js\x1B[0m $ ");

// Fit the terminal to the dimensions of its parent
fitAddon.fit();

// Resize the terminal when the window is resized
window.addEventListener("resize", () => {
  fitAddon.fit();
});

let inputBuffer = "";
term.onData((data) => {
  // Handle Enter key press
  if (data === "\r" || data === "\n") {
    // Handle the command
    term.write("\r\n"); // Move to the next line
    if (inputBuffer === "exit") {
      console.log("exit");
      term.write("Goodbye!\r\n");
      window.location.href = "https://www.ecosia.org";
      // term.dispose();
    } else {
      term.write("You typed: " + inputBuffer + "\r\n");
    }

    term.write("\r\n"); // Move to the next line
    term.write("$ "); // Print the prompt
    // Clear the buffer
    inputBuffer = "";
  } else {
    term.write(data); // Echo other characters
    inputBuffer += data;
  }
});
