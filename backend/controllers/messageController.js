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

        // Push the new message ID to the conversation
        conversation.messages.push(newMessage._id);
        // Save both conversation and new message before sending the response
        await Promise.all([conversation.save(), newMessage.save()]);
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
        const { id: userToChatId } = req.params;
        console.log("userToChatId ", userToChatId);
        const senderId = req.user._id;
        console.log("senderId " + senderId);

        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, userToChatId] },
        }).populate("messages"); // NOT REFERENCE BUT ACTUAL MESSAGES

        if (!conversation) return res.status(200).json([]);

        const messages = conversation.messages;

        res.status(200).json(messages);
    } catch (error) {
        console.log("Error in getMessages controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}

module.exports = { sendMessage, getMessage };
