document.addEventListener('DOMContentLoaded', function() {
    const user_input = document.getElementById('user-input');
    const chat_container = document.querySelector('.chat-container');

    document.getElementById('send-button').addEventListener('click', function() {
        const user_message = user_input.value.trim();
        if (user_message !== '') {
            const user_message_element = document.createElement('div');
            user_message_element.classList.add('user-message');
            user_message_element.textContent = user_message;
            chat_container.appendChild(user_message_element);

            // Clear the input field after sending the message
            user_input.value = '';

            // Scroll to the bottom of the chat container
            chat_container.scrollTop = chat_container.scrollHeight;

            // Send the user message to the server and get the chatbot's response
            fetch('/get_response', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ message: user_message })
            })
            .then(response => response.json())
            .then(data => {
                const chatbot_message_element = document.createElement('div');
                chatbot_message_element.classList.add('chatbot-message');
                chatbot_message_element.textContent = data.reply;
                chat_container.appendChild(chatbot_message_element);

                // Scroll to the bottom of the chat container after receiving the chatbot's response
                chat_container.scrollTop = chat_container.scrollHeight;
            });
        }
    });
});
