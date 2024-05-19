const Message = require("../models/messageModel");
const Conversation = require("../models/conversationModel");

// Sending message
const sendMessage = async (req, res) => {
    try {
        const { message } = req.body;
        const { id: receiverId } = req.params;
        console.log("receiverID " + receiverId);
        const senderId = req.user._id;
        console.log("senderId " + senderId);

        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] },
        });

        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId],
            });
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            message,
        });

        // Save both conversation and new message before sending the response
        await Promise.all([conversation.save(), newMessage.save()]);
        // Push the new message ID to the conversation
        conversation.messages.push(newMessage._id);
        // Save the conversation again to update the messages array
        await conversation.save();

        res.status(201).json(newMessage);

    } catch (error) {
        console.log("Error in sendMessage controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}

// Receiving message
const getMessage = async (req, res) => {
    try {
        // Implement code to retrieve messages
    } catch (error) {
        console.log("Error in getMessage controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}

module.exports = { sendMessage, getMessage };
