import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, ActivityIndicator, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { COLORS } from '../../src/constants/colors';
import { chatApi } from '../../src/services/chatApi';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
}

const SUGGESTED_QUESTIONS = [
  "Tôi nên ăn gì để giảm cân?",
  "Làm thế nào để tăng cơ?",
  "Thực đơn cho người tiểu đường?",
  "Cách tính calo hàng ngày?",
  "Thực phẩm tốt cho tim mạch?"
];

function HeaderBar() {
  return (
    <View style={styles.header}>
      <View style={styles.logoRow}>
        <Text style={styles.appName}>Diet<Text style={styles.appNameAI}>AI</Text></Text>
      </View>
      <TouchableOpacity style={styles.infoBtn}>
        <Text style={styles.infoIcon}>i</Text>
      </TouchableOpacity>
    </View>
  );
}

function ChatSection() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Chào, tôi là trợ lý dinh dưỡng thông minh của bạn. Tôi có thể giúp gì cho bạn?',
      isUser: false
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  const handleSend = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isUser: true
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      const response = await chatApi.sendMessage(inputText);
      if (response.error) {
        throw new Error(response.error);
      }

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response.message,
        isUser: false
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      Alert.alert('Lỗi', 'Không thể gửi tin nhắn. Vui lòng thử lại sau.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestedQuestion = (question: string) => {
    setInputText(question);
  };

  return (
    <KeyboardAvoidingView 
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      <View style={styles.chatSection}>
        <ScrollView 
          ref={scrollViewRef}
          style={{ flex: 1 }} 
          contentContainerStyle={{ paddingBottom: 16 }} 
          showsVerticalScrollIndicator={false}
          onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
        >
          {messages.map((message) => (
            <View 
              key={message.id} 
              style={[
                styles.messageBubble,
                message.isUser ? styles.userBubble : styles.aiBubble
              ]}
            >
              <Text style={[
                styles.messageText,
                message.isUser ? styles.userText : styles.aiText
              ]}>
                {message.text}
              </Text>
            </View>
          ))}
          {isLoading && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator color={COLORS.primary} />
            </View>
          )}
          
          {messages.length === 1 && (
            <View style={styles.suggestionsContainer}>
              <Text style={styles.suggestionsTitle}>Bạn có thể hỏi:</Text>
              {SUGGESTED_QUESTIONS.map((question, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.suggestionButton}
                  onPress={() => handleSuggestedQuestion(question)}
                >
                  <Text style={styles.suggestionText}>{question}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </ScrollView>
        <View style={styles.inputContainer}>
          <TextInput 
            style={styles.input} 
            placeholder="Nhập câu hỏi..." 
            placeholderTextColor={COLORS.textSecondary}
            value={inputText}
            onChangeText={setInputText}
            multiline
            maxLength={500}
          />
          <TouchableOpacity 
            style={[styles.sendBtn, !inputText.trim() && styles.sendBtnDisabled]} 
            onPress={handleSend}
            disabled={!inputText.trim() || isLoading}
          >
            <Text style={styles.sendBtnText}>➤</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

export default function ExpertScreen() {
  return (
    <View style={styles.container}>
      <HeaderBar />
      <ChatSection />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 10,
    backgroundColor: COLORS.background,
    borderBottomWidth: 0.5,
    borderBottomColor: COLORS.border,
    elevation: 2,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  appName: {
    fontSize: 26,
    fontWeight: 'bold',
    color: COLORS.text,
    letterSpacing: 0.5,
  },
  appNameAI: {
    color: COLORS.primary,
  },
  infoBtn: {
    marginLeft: 8,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoIcon: {
    color: COLORS.primary,
    fontWeight: 'bold',
    fontSize: 19,
  },
  chatSection: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 0,
    justifyContent: 'flex-end',
  },
  messageBubble: {
    borderRadius: 18,
    padding: 14,
    marginBottom: 10,
    maxWidth: '80%',
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  aiBubble: {
    alignSelf: 'flex-start',
    backgroundColor: '#2196F3',
  },
  userBubble: {
    alignSelf: 'flex-end',
    backgroundColor: '#E3F2FD',
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
  },
  aiText: {
    color: 'white',
  },
  userText: {
    color: COLORS.text,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 24,
    paddingHorizontal: 14,
    paddingVertical: 8,
    margin: 10,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 2,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: COLORS.text,
    paddingVertical: 6,
    paddingHorizontal: 8,
    backgroundColor: 'transparent',
    maxHeight: 100,
  },
  sendBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: 16,
    padding: 8,
    marginLeft: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendBtnDisabled: {
    opacity: 0.5,
  },
  sendBtnText: {
    fontSize: 18,
    color: 'white',
  },
  loadingContainer: {
    padding: 10,
    alignItems: 'center',
  },
  suggestionsContainer: {
    padding: 16,
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    marginTop: 10,
  },
  suggestionsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 12,
  },
  suggestionButton: {
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#E9ECEF',
  },
  suggestionText: {
    color: COLORS.text,
    fontSize: 14,
  },
}); 