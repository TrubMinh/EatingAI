import Ionicons from '@expo/vector-icons/Ionicons';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { COLORS } from '../../constants/colors';
import { getFoodDetails, searchFoods } from '../../services/nutrition/foodApi';
import { FoodItem, FoodSearchResult } from '../../types/nutrition';

interface AddFoodModalProps {
  visible: boolean;
  onClose: () => void;
  onAddFood: (food: FoodItem, quantity: number, mealType: string) => void;
  mealType: string;
}

export default function AddFoodModal({ visible, onClose, onAddFood, mealType }: AddFoodModalProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<FoodSearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);
  const [quantity, setQuantity] = useState('100');

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      Alert.alert('Lỗi', 'Vui lòng nhập tên thực phẩm cần tìm');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      console.log('Bắt đầu tìm kiếm:', searchQuery);
      const results = await searchFoods(searchQuery);
      console.log('Kết quả tìm kiếm:', results);
      setSearchResults(results);
    } catch (error: any) {
      console.error('Lỗi tìm kiếm:', error);
      setError(error.message || 'Không thể tìm kiếm thực phẩm');
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectFood = async (food: FoodSearchResult) => {
    setLoading(true);
    setError(null);
    try {
      console.log('Đang lấy thông tin chi tiết cho:', food);
      const foodDetails = await getFoodDetails(food.fdcId);
      console.log('Thông tin chi tiết:', foodDetails);
      setSelectedFood(foodDetails);
      setQuantity(food.servingSize.toString());
    } catch (error: any) {
      console.error('Lỗi lấy thông tin chi tiết:', error);
      setError(error.message || 'Không thể lấy thông tin chi tiết thực phẩm');
    } finally {
      setLoading(false);
    }
  };

  const handleAddFood = () => {
    if (!selectedFood || !quantity) return;
    
    const quantityNum = parseFloat(quantity);
    if (isNaN(quantityNum) || quantityNum <= 0) {
      setError('Vui lòng nhập số lượng hợp lệ');
      return;
    }

    onAddFood(selectedFood, quantityNum, mealType);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Thêm thực phẩm - {mealType}</Text>
          
          {!selectedFood ? (
            <>
              <View style={styles.searchContainer}>
                <TextInput
                  style={styles.searchInput}
                  placeholder="Tìm kiếm thực phẩm..."
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                  onSubmitEditing={handleSearch}
                  returnKeyType="search"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
                <TouchableOpacity 
                  style={styles.searchButton} 
                  onPress={handleSearch}
                  disabled={loading}
                >
                  <Text style={styles.searchButtonText}>
                    {loading ? 'Đang tìm...' : 'Tìm'}
                  </Text>
                </TouchableOpacity>
              </View>

              {error && (
                <View style={styles.errorContainer}>
                  <Text style={styles.errorText}>{error}</Text>
                </View>
              )}

              {loading ? (
                <View style={styles.loadingContainer}>
                  <ActivityIndicator size="large" color="#007AFF" />
                  <Text style={styles.loadingText}>Đang tìm kiếm...</Text>
                </View>
              ) : searchResults.length > 0 ? (
                <FlatList
                  data={searchResults}
                  keyExtractor={(item) => item.fdcId.toString()}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={styles.foodItem}
                      onPress={() => handleSelectFood(item)}
                    >
                      <View style={styles.foodInfo}>
                        <Text style={styles.foodName}>{item.description}</Text>
                        {item.brandOwner && (
                          <Text style={styles.brandName}>{item.brandOwner}</Text>
                        )}
                        <Text style={styles.servingSize}>
                          {item.servingSize} {item.servingSizeUnit}
                        </Text>
                      </View>
                      <Ionicons name="chevron-forward" size={24} color="#666" />
                    </TouchableOpacity>
                  )}
                  contentContainerStyle={styles.resultsList}
                />
              ) : searchQuery ? (
                <View style={styles.noResultsContainer}>
                  <Text style={styles.noResultsText}>
                    Không tìm thấy kết quả cho "{searchQuery}"
                  </Text>
                  <Text style={styles.noResultsSubtext}>
                    Hãy thử tìm kiếm với từ khóa khác
                  </Text>
                </View>
              ) : null}
            </>
          ) : (
            <>
              <View style={styles.selectedFoodContainer}>
                <Text style={styles.foodName}>{selectedFood.description}</Text>
                {selectedFood.brandOwner && (
                  <Text style={styles.brandName}>{selectedFood.brandOwner}</Text>
                )}
                
                <View style={styles.quantityContainer}>
                  <Text style={styles.quantityLabel}>Số lượng:</Text>
                  <TextInput
                    style={styles.quantityInput}
                    value={quantity}
                    onChangeText={setQuantity}
                    keyboardType="numeric"
                    placeholder="100"
                  />
                  <Text style={styles.unit}>{selectedFood.servingSizeUnit}</Text>
                </View>

                <View style={styles.nutritionInfo}>
                  <Text style={styles.nutritionTitle}>Thông tin dinh dưỡng:</Text>
                  <Text>Calories: {selectedFood.nutrients.calories} kcal</Text>
                  <Text>Protein: {selectedFood.nutrients.protein}g</Text>
                  <Text>Carbs: {selectedFood.nutrients.carbohydrates}g</Text>
                  <Text>Fat: {selectedFood.nutrients.fat}g</Text>
                </View>
              </View>

              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={[styles.button, styles.cancelButton]}
                  onPress={() => setSelectedFood(null)}
                >
                  <Text style={styles.buttonText}>Quay lại</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, styles.addButton]}
                  onPress={handleAddFood}
                >
                  <Text style={styles.buttonText}>Thêm</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: COLORS.background,
    borderRadius: 16,
    padding: 20,
    width: '90%',
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 16,
    textAlign: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    padding: 8,
    marginRight: 8,
  },
  searchButton: {
    backgroundColor: COLORS.primary,
    padding: 8,
    borderRadius: 8,
    justifyContent: 'center',
  },
  searchButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  foodItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    flexDirection: 'row',
    alignItems: 'center',
  },
  foodInfo: {
    flex: 1,
  },
  foodName: {
    fontSize: 16,
    color: COLORS.text,
  },
  brandName: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  selectedFoodContainer: {
    marginBottom: 16,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },
  quantityLabel: {
    fontSize: 16,
    marginRight: 8,
  },
  quantityInput: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    padding: 8,
    width: 80,
    marginRight: 8,
  },
  unit: {
    fontSize: 16,
    color: COLORS.textSecondary,
  },
  nutritionInfo: {
    marginTop: 16,
    padding: 12,
    backgroundColor: '#F5F7FA',
    borderRadius: 8,
  },
  nutritionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  button: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    marginHorizontal: 8,
  },
  cancelButton: {
    backgroundColor: '#E0E0E0',
  },
  addButton: {
    backgroundColor: COLORS.primary,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  errorContainer: {
    padding: 10,
    marginHorizontal: 16,
    backgroundColor: '#FFE5E5',
    borderRadius: 8,
    marginBottom: 10,
  },
  errorText: {
    color: '#D32F2F',
    fontSize: 14,
    textAlign: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  noResultsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  noResultsText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginBottom: 8,
  },
  noResultsSubtext: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  resultsList: {
    padding: 10,
  },
  servingSize: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
}); 