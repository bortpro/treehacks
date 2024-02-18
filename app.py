from flask import Flask, render_template, request, jsonify
from cgpt import llm_complete

app = Flask(__name__)

# Initialize global_history as an empty list
global_history = []

@app.route('/')
def index():
    featured_images = ['coffee1.png']
    favorite_images = ['fav_1.png', 'fav_2.png', 'fav_3.png']
    category_images = ['category.png', 'category_2.png', 'category_3.png', 'category_4.png']

    imageFilenames = featured_images  # Set imageFilenames to the list of featured_images

    return render_template('index.html', favorite_images=favorite_images, category_images=category_images,
                           imageFilenames=imageFilenames)


@app.route('/get_response', methods=['POST'])
def get_response():
    global global_history  # Use the global_history variable
    data = request.get_json()
    user_message = data['message']

    # Append the user message to the global_history
    global_history.append({"role": "user", "content": user_message})

    # Use the global_history in llm_complete function
    reply = llm_complete(global_history)

    # Append the chatbot response to the global_history
    global_history.append({"role": "system", "content": reply})

    # Return the reply to the client
    return jsonify({"reply": reply})


if __name__ == '__main__':
    app.run(debug=True)
