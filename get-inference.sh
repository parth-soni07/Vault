#!/usr/bin/expect -f

# Get topic_id from the first argument
set topic_id [lindex $argv 0]

# Start the CLI process
spawn poetry run python main.py

# Wait for the CLI prompt
expect ">"

# Load the agent
send "load-agent allora\r"

# Wait for the next prompt
expect ">"

# Send the agent-action command with the dynamic topic_id
send "agent-action allora get-inference $topic_id\r"

# Capture the inference output
expect -re {Result: {(.*)}}
set inference_output $expect_out(1,string)

# Write the output to a file
set file [open "inference_result.txt" w]
puts $file $inference_output
close $file

# Exit the CLI
expect ">"
send "exit\r"

# End the script
expect eof
