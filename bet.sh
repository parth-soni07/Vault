#!/usr/bin/expect -f

# Get topic_ids from the arguments
set topic_id1 [lindex $argv 0]
set topic_id2 [lindex $argv 1]
set topic_id3 [lindex $argv 2]

# Start the CLI process
spawn poetry run python main.py

# Wait for the CLI prompt
expect ">"

# Load the agent
send "load-agent allora\r"

# Wait for the next prompt
expect ">"

# Define an empty list to store results
set results {}

# Function to get inference for a topic_id
proc get_inference {topic_id results} {
    send "agent-action allora get-inference $topic_id\r"
    expect -re {Result: {(.*)}}
    lappend results $expect_out(1,string)
    expect ">"
    return $results
}

# Run inference for each topic_id
set results [get_inference $topic_id1 $results]
set results [get_inference $topic_id2 $results]
set results [get_inference $topic_id3 $results]

# Write the output to a file
set file [open "inference_result.txt" w]
puts $file "Inference Results:"
foreach result $results {
    puts $file $result
}
close $file

# Exit the CLI
send "exit\r"
expect eof