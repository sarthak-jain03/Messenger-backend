const { ConversationModel, MessageModel } = require("../models/ConversationModel");

const deleteConversation = async (req, res) => {
  try {
    const { conversationId } = req.params;

    // Fetch the conversation to get message IDs
    const conversation = await ConversationModel.findById(conversationId);

    if (!conversation) {
      return res.status(404).json({
        message: "Conversation not found",
        error: true,
      });
    }

    // Delete all messages associated with this conversation
    await MessageModel.deleteMany({ _id: { $in: conversation.messages } });

    // Delete the conversation
    await ConversationModel.findByIdAndDelete(conversationId);

    return res.status(200).json({
      message: "Chat deleted successfully",
      success: true,
    });
  } catch (error) {
    console.error("Delete Chat Error:", error.message);
    return res.status(500).json({
      message: "Server error while deleting chat",
      error: true,
    });
  }
};

module.exports = deleteConversation;
