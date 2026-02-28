import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';

// 메인 앱 컴포넌트
const WanderLustApp = () => {
  const [currentScreen, setCurrentScreen] = useState('home');
  const [travelData, setTravelData] = useState({
    destinations: [],
    travelVibe: 'private',
    explorationStyle: 'spontaneous',
    pace: 50,
    climates: ['tropical'],
    dining: 'casual',
    dailyPace: 'moderate',
    accommodation: 'hotel',
    budget: 2000,
    travelWith: 'solo',
    dates: { start: '', end: '' },
  });

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return <HomeScreen onStart={() => setCurrentScreen('destinations')} />;
      case 'destinations':
        return (
          <DestinationsScreen
            onNext={() => setCurrentScreen('travelDNA')}
            travelData={travelData}
            setTravelData={setTravelData}
          />
        );
      case 'travelDNA':
        return (
          <TravelDNAScreen
            onNext={() => setCurrentScreen('finalDetails')}
            onBack={() => setCurrentScreen('destinations')}
            travelData={travelData}
            setTravelData={setTravelData}
          />
        );
      case 'finalDetails':
        return (
          <FinalDetailsScreen
            onGenerate={() => setCurrentScreen('itinerary')}
            onBack={() => setCurrentScreen('travelDNA')}
            travelData={travelData}
            setTravelData={setTravelData}
          />
        );
      case 'itinerary':
        return (
          <ItineraryScreen
            onBack={() => setCurrentScreen('home')}
            travelData={travelData}
          />
        );
      default:
        return <HomeScreen onStart={() => setCurrentScreen('destinations')} />;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1a1a2e" />
      {renderScreen()}
    </SafeAreaView>
  );
};

// 홈 스크린
const HomeScreen = ({ onStart }) => {
  return (
    <View style={styles.homeContainer}>
      <View style={styles.homeHeader}>
        <Text style={styles.logo}>WanderLust AI</Text>
      </View>
      
      <View style={styles.heroSection}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>AI-POWERED TRAVEL ARCHITECT</Text>
        </View>
        
        <Text style={styles.heroTitle}>Design Your</Text>
        <Text style={[styles.heroTitle, styles.heroTitleAccent]}>Perfect Escape</Text>
        
        <Text style={styles.heroSubtitle}>
          Stop planning, start dreaming. Our AI curates personalized journeys
          tailored to your unique travel DNA and personality.
        </Text>
        
        <TouchableOpacity style={styles.startButton} onPress={onStart}>
          <Text style={styles.startButtonText}>Start Your Journey</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.featuresContainer}>
        <FeatureCard
          icon="📍"
          title="Smart Itineraries"
          description="Day-by-day plans optimized for your pace."
        />
        <FeatureCard
          icon="✨"
          title="Hidden Gems"
          description="Discover spots only locals know about."
        />
        <FeatureCard
          icon="🎯"
          title="Personality Match"
          description="Trips designed for your MBTI type."
        />
      </View>
    </View>
  );
};

// 목적지 선택 스크린
const DestinationsScreen = ({ onNext, travelData, setTravelData }) => {
  const destinations = [
    { name: 'Indonesia', city: 'Bali', image: '🏝️' },
    { name: 'Japan', city: 'Kyoto', image: '🏯' },
    { name: 'France', city: 'Nice', image: '🗼' },
    { name: 'South Korea', city: 'Seoul', image: '🏙️' },
    { name: 'Thailand', city: 'Phuket', image: '🌴' },
    { name: 'Japan', city: 'Hokkaido', image: '⛰️' },
    { name: 'USA', city: 'New York', image: '🗽' },
    { name: 'Greece', city: 'Santorini', image: '🏛️' },
  ];

  const toggleDestination = (dest) => {
    const isSelected = travelData.destinations.some(d => d.name === dest.name && d.city === dest.city);
    if (isSelected) {
      setTravelData({
        ...travelData,
        destinations: travelData.destinations.filter(d => !(d.name === dest.name && d.city === dest.city))
      });
    } else {
      setTravelData({
        ...travelData,
        destinations: [...travelData.destinations, dest]
      });
    }
  };

  return (
    <View style={styles.screenContainer}>
      <View style={styles.header}>
        <Text style={styles.stepText}>STEP 2 OF 3</Text>
        <Text style={styles.screenTitle}>Pick Your Paradise</Text>
        <Text style={styles.screenSubtitle}>Where is your heart leading you?</Text>
      </View>
      
      <ScrollView style={styles.content}>
        <Text style={styles.sectionTitle}>TROPICAL MATCHES FOR YOU:</Text>
        
        <View style={styles.destinationsGrid}>
          {destinations.map((dest, index) => {
            const isSelected = travelData.destinations.some(
              d => d.name === dest.name && d.city === dest.city
            );
            return (
              <TouchableOpacity
                key={index}
                style={[styles.destinationCard, isSelected && styles.destinationCardSelected]}
                onPress={() => toggleDestination(dest)}
              >
                <Text style={styles.destinationEmoji}>{dest.image}</Text>
                <Text style={styles.destinationName}>{dest.name}</Text>
                <Text style={styles.destinationCity}>{dest.city}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
      
      <TouchableOpacity style={styles.nextButton} onPress={onNext}>
        <Text style={styles.nextButtonText}>Next Step</Text>
      </TouchableOpacity>
    </View>
  );
};

// 여행 DNA 스크린
const TravelDNAScreen = ({ onNext, onBack, travelData, setTravelData }) => {
  return (
    <View style={styles.screenContainer}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack}>
          <Text style={styles.backButton}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.stepText}>STEP 1 OF 3</Text>
        <Text style={styles.screenTitle}>Define Your Travel DNA</Text>
        <Text style={styles.screenSubtitle}>Help us understand your perfect trip.</Text>
      </View>
      
      <ScrollView style={styles.content}>
        {/* Travel Vibe */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>YOUR TRAVEL VIBE</Text>
          <View style={styles.optionsRow}>
            <TouchableOpacity
              style={[
                styles.optionButton,
                travelData.travelVibe === 'social' && styles.optionButtonActive
              ]}
              onPress={() => setTravelData({ ...travelData, travelVibe: 'social' })}
            >
              <Text style={styles.optionText}>Social & Lively</Text>
              <Text style={styles.optionSubtext}>LOVE MEETING PEOPLE</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.optionButton,
                travelData.travelVibe === 'private' && styles.optionButtonActive
              ]}
              onPress={() => setTravelData({ ...travelData, travelVibe: 'private' })}
            >
              <Text style={styles.optionText}>Private & Quiet</Text>
              <Text style={styles.optionSubtext}>PEACEFUL RELAXATION</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Exploration Style */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>EXPLORATION STYLE</Text>
          <View style={styles.optionsRow}>
            <TouchableOpacity
              style={[
                styles.optionButton,
                travelData.explorationStyle === 'spontaneous' && styles.optionButtonActive
              ]}
              onPress={() => setTravelData({ ...travelData, explorationStyle: 'spontaneous' })}
            >
              <Text style={styles.optionText}>Spontaneous</Text>
              <Text style={styles.optionSubtext}>FOLLOW THE FLOW</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.optionButton,
                travelData.explorationStyle === 'planned' && styles.optionButtonActive
              ]}
              onPress={() => setTravelData({ ...travelData, explorationStyle: 'planned' })}
            >
              <Text style={styles.optionText}>Well-Planned</Text>
              <Text style={styles.optionSubtext}>EVERY DETAIL COUNTS</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Travel Pace */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>TRAVEL PACE & STYLE</Text>
          <View style={styles.sliderContainer}>
            <Text style={styles.sliderLabel}>Chill</Text>
            <View style={styles.sliderTrack}>
              <View style={[styles.sliderFill, { width: `${travelData.pace}%` }]} />
            </View>
            <Text style={styles.sliderLabel}>Active</Text>
          </View>
          <Text style={styles.sliderValue}>{travelData.pace}%</Text>
        </View>

        {/* Climates */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>PREFERRED CLIMATES (SELECT MULTIPLE)</Text>
          <View style={styles.climateGrid}>
            {['🌴 Tropical', '⛰️ Alpine', '🏙️ Urban', '🏖️ Mediterranean', '🏜️ Desert', '🌊 Oceanic'].map((climate) => {
              const key = climate.split(' ')[1].toLowerCase();
              const isSelected = travelData.climates.includes(key);
              return (
                <TouchableOpacity
                  key={climate}
                  style={[styles.climateButton, isSelected && styles.climateButtonSelected]}
                  onPress={() => {
                    if (isSelected) {
                      setTravelData({
                        ...travelData,
                        climates: travelData.climates.filter(c => c !== key)
                      });
                    } else {
                      setTravelData({
                        ...travelData,
                        climates: [...travelData.climates, key]
                      });
                    }
                  }}
                >
                  <Text style={styles.climateText}>{climate}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Dining Preference */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>DINING PREFERENCE</Text>
          <View style={styles.rangePicker}>
            {['Street Food', 'Casual Dining', 'Fine Dining'].map((option, index) => {
              const value = ['street', 'casual', 'fine'][index];
              return (
                <TouchableOpacity
                  key={option}
                  style={[
                    styles.rangeOption,
                    travelData.dining === value && styles.rangeOptionSelected
                  ]}
                  onPress={() => setTravelData({ ...travelData, dining: value })}
                >
                  <Text style={styles.rangeText}>{option}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Daily Pace */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>DAILY PACE</Text>
          <View style={styles.rangePicker}>
            {['Relaxed', 'Moderate', 'Packed'].map((option, index) => {
              const value = ['relaxed', 'moderate', 'packed'][index];
              return (
                <TouchableOpacity
                  key={option}
                  style={[
                    styles.rangeOption,
                    travelData.dailyPace === value && styles.rangeOptionSelected
                  ]}
                  onPress={() => setTravelData({ ...travelData, dailyPace: value })}
                >
                  <Text style={styles.rangeText}>{option}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Accommodation */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>ACCOMMODATION</Text>
          <View style={styles.rangePicker}>
            {['Hostel', 'Hotel', 'Luxury Resort', 'Airbnb'].map((option, index) => {
              const value = ['hostel', 'hotel', 'luxury', 'airbnb'][index];
              return (
                <TouchableOpacity
                  key={option}
                  style={[
                    styles.rangeOption,
                    travelData.accommodation === value && styles.rangeOptionSelected
                  ]}
                  onPress={() => setTravelData({ ...travelData, accommodation: value })}
                >
                  <Text style={styles.rangeText}>{option}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </ScrollView>
      
      <TouchableOpacity style={styles.nextButton} onPress={onNext}>
        <Text style={styles.nextButtonText}>Next Step</Text>
      </TouchableOpacity>
    </View>
  );
};

// 최종 상세정보 스크린
const FinalDetailsScreen = ({ onGenerate, onBack, travelData, setTravelData }) => {
  return (
    <View style={styles.screenContainer}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack}>
          <Text style={styles.backButton}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.screenTitle}>Final Details</Text>
        <Text style={styles.screenSubtitle}>Logistics and final touches.</Text>
      </View>
      
      <ScrollView style={styles.content}>
        {/* Travel Dates */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>TRAVEL DATES</Text>
          <View style={styles.dateInputs}>
            <View style={styles.dateInput}>
              <Text style={styles.inputLabel}>Start Date</Text>
              <TextInput
                style={styles.input}
                placeholder="YYYY-MM-DD"
                placeholderTextColor="#666"
                value={travelData.dates.start}
                onChangeText={(text) => 
                  setTravelData({ ...travelData, dates: { ...travelData.dates, start: text }})
                }
              />
            </View>
            <View style={styles.dateInput}>
              <Text style={styles.inputLabel}>End Date</Text>
              <TextInput
                style={styles.input}
                placeholder="YYYY-MM-DD"
                placeholderTextColor="#666"
                value={travelData.dates.end}
                onChangeText={(text) => 
                  setTravelData({ ...travelData, dates: { ...travelData.dates, end: text }})
                }
              />
            </View>
          </View>
        </View>

        {/* Budget */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>BUDGET PER PERSON</Text>
          <View style={styles.budgetContainer}>
            <Text style={styles.budgetLabel}>Estimated Budget</Text>
            <Text style={styles.budgetValue}>${travelData.budget.toLocaleString()}</Text>
          </View>
          <View style={styles.sliderTrack}>
            <View style={[styles.sliderFill, { width: `${(travelData.budget / 10000) * 100}%` }]} />
          </View>
          <View style={styles.budgetRange}>
            <Text style={styles.budgetRangeText}>$500</Text>
            <Text style={styles.budgetRangeText}>$10000+</Text>
          </View>
        </View>

        {/* Traveling With */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>TRAVELING WITH</Text>
          <View style={styles.travelWithGrid}>
            {[
              { icon: '👤', label: 'Solo', value: 'solo' },
              { icon: '👫', label: 'Couple', value: 'couple' },
              { icon: '👥', label: 'Friends', value: 'friends' },
              { icon: '👨‍👩‍👧‍👦', label: 'Family', value: 'family' },
            ].map((option) => (
              <TouchableOpacity
                key={option.value}
                style={[
                  styles.travelWithCard,
                  travelData.travelWith === option.value && styles.travelWithCardSelected
                ]}
                onPress={() => setTravelData({ ...travelData, travelWith: option.value })}
              >
                <Text style={styles.travelWithIcon}>{option.icon}</Text>
                <Text style={styles.travelWithLabel}>{option.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
      
      <TouchableOpacity style={styles.generateButton} onPress={onGenerate}>
        <Text style={styles.generateButtonText}>Generate My Plan</Text>
      </TouchableOpacity>
    </View>
  );
};

// 일정 스크린
const ItineraryScreen = ({ onBack, travelData }) => {
  const [activeTab, setActiveTab] = useState('itinerary');

  // 샘플 일정 데이터
  const sampleItinerary = [
    {
      time: '9:00 AM',
      name: 'TeamLab Planets Immersive Art',
      description: 'A solitary sensory journey through digital water and mirror rooms.',
      tags: ['ART', 'QUIET', '#STATIC'],
    },
    {
      time: '1:00 PM',
      name: 'Nezu Museum & Garden',
      description: 'A hidden gem featuring pre-modern Japanese and East Asian art in a stunningly silent garden setting.',
      tags: ['ART', 'QUIET', '#SCENERY'],
    },
    {
      time: '5:00 PM',
      name: 'Afuri Ramen',
      description: 'Signature yuzu-infused ramen in a modern setting.',
      rating: '4.6',
      reviews: '15k+ reviews',
    },
  ];

  return (
    <View style={styles.screenContainer}>
      {/* 헤더 이미지 */}
      <View style={styles.itineraryHeader}>
        <TouchableOpacity style={styles.backButtonCircle} onPress={onBack}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <View style={styles.itineraryHeaderContent}>
          <View style={styles.aiTailoredBadge}>
            <Text style={styles.aiTailoredText}>🎯 AI TAILORED FOR YOUR STYLE</Text>
          </View>
          <Text style={styles.itineraryTitle}>Japan</Text>
          <Text style={styles.itineraryDates}>Feb 13 — Feb 17, 2025</Text>
        </View>
      </View>

      {/* 탭 네비게이션 */}
      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'itinerary' && styles.tabActive]}
          onPress={() => setActiveTab('itinerary')}
        >
          <Text style={[styles.tabText, activeTab === 'itinerary' && styles.tabTextActive]}>
            ITINERARY
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'summary' && styles.tabActive]}
          onPress={() => setActiveTab('summary')}
        >
          <Text style={[styles.tabText, activeTab === 'summary' && styles.tabTextActive]}>
            SUMMARY
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'map' && styles.tabActive]}
          onPress={() => setActiveTab('map')}
        >
          <Text style={[styles.tabText, activeTab === 'map' && styles.tabTextActive]}>
            MAP
          </Text>
        </TouchableOpacity>
      </View>

      {/* 일정 내용 */}
      <ScrollView style={styles.itineraryContent}>
        <View style={styles.dayHeader}>
          <View style={styles.dayBadge}>
            <Text style={styles.dayBadgeText}>DAY 1</Text>
          </View>
          <Text style={styles.transitMaster}>🚇 TRANSIT MASTER</Text>
        </View>

        <View style={styles.tipBox}>
          <Text style={styles.tipText}>
            💡 Tip: Purchase a regional transit pass for unlimited rides and use real-time apps for schedules.
          </Text>
        </View>

        {sampleItinerary.map((item, index) => (
          <View key={index} style={styles.itineraryItem}>
            <View style={styles.timelineMarker}>
              <View style={styles.timelineDot} />
              {index < sampleItinerary.length - 1 && <View style={styles.timelineLine} />}
            </View>
            
            <View style={styles.itineraryCard}>
              <View style={styles.itineraryCardHeader}>
                <View>
                  <Text style={styles.itineraryTime}>{item.time}</Text>
                  <Text style={styles.itineraryName}>{item.name}</Text>
                </View>
                <TouchableOpacity style={styles.viewMapButton}>
                  <Text style={styles.viewMapText}>VIEW ON MAP</Text>
                </TouchableOpacity>
              </View>
              
              <Text style={styles.itineraryDescription}>{item.description}</Text>
              
              <View style={styles.itineraryTags}>
                {item.tags && item.tags.map((tag, i) => (
                  <View key={i} style={styles.tag}>
                    <Text style={styles.tagText}>{tag}</Text>
                  </View>
                ))}
              </View>
              
              {item.rating && (
                <View style={styles.ratingContainer}>
                  <Text style={styles.rating}>⭐ {item.rating}</Text>
                  <Text style={styles.reviews}>{item.reviews}</Text>
                </View>
              )}
            </View>
          </View>
        ))}

        {/* VIP Deals 카드 */}
        <View style={styles.vipCard}>
          <Text style={styles.vipBadge}>EXCLUSIVE PARTNERS</Text>
          <Text style={styles.vipTitle}>WanderLust VIP DEALS</Text>
          <Text style={styles.vipDescription}>
            Unlock up to 40% OFF on Luxury Hotels & Business Class in Japan.
          </Text>
          <View style={styles.vipFeatures}>
            <Text style={styles.vipFeature}>✓ Free Lounge Access</Text>
            <Text style={styles.vipFeature}>✓ Priority Boarding</Text>
          </View>
          <TouchableOpacity style={styles.claimButton}>
            <Text style={styles.claimButtonText}>CLAIM NOW</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

// Feature Card 컴포넌트
const FeatureCard = ({ icon, title, description }) => {
  return (
    <View style={styles.featureCard}>
      <Text style={styles.featureIcon}>{icon}</Text>
      <Text style={styles.featureTitle}>{title}</Text>
      <Text style={styles.featureDescription}>{description}</Text>
    </View>
  );
};

// 스타일
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f1e',
  },
  
  // Home Screen
  homeContainer: {
    flex: 1,
    backgroundColor: '#0f0f1e',
  },
  homeHeader: {
    padding: 20,
    paddingTop: 10,
  },
  logo: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
  },
  heroSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  badge: {
    backgroundColor: 'rgba(144, 238, 144, 0.2)',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 20,
  },
  badgeText: {
    color: '#90EE90',
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 1,
  },
  heroTitle: {
    fontSize: 42,
    fontWeight: '700',
    color: '#fff',
    textAlign: 'center',
  },
  heroTitleAccent: {
    color: '#90EE90',
  },
  heroSubtitle: {
    fontSize: 15,
    color: '#aaa',
    textAlign: 'center',
    marginTop: 15,
    lineHeight: 22,
  },
  startButton: {
    backgroundColor: '#90EE90',
    paddingHorizontal: 40,
    paddingVertical: 16,
    borderRadius: 30,
    marginTop: 30,
  },
  startButtonText: {
    color: '#0f0f1e',
    fontSize: 16,
    fontWeight: '700',
  },
  featuresContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
    paddingBottom: 30,
  },
  featureCard: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  featureIcon: {
    fontSize: 30,
    marginBottom: 8,
  },
  featureTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 4,
    textAlign: 'center',
  },
  featureDescription: {
    fontSize: 10,
    color: '#888',
    textAlign: 'center',
  },

  // Common Screen Styles
  screenContainer: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    backgroundColor: '#fff',
    padding: 20,
    paddingTop: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  backButton: {
    color: '#90EE90',
    fontSize: 16,
    marginBottom: 10,
  },
  stepText: {
    fontSize: 11,
    color: '#90EE90',
    fontWeight: '600',
    letterSpacing: 1,
    marginBottom: 8,
  },
  screenTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 6,
  },
  screenSubtitle: {
    fontSize: 15,
    color: '#666',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#666',
    marginBottom: 15,
    letterSpacing: 0.5,
  },
  sectionLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#666',
    marginBottom: 12,
    letterSpacing: 0.5,
  },
  nextButton: {
    backgroundColor: '#90EE90',
    margin: 20,
    padding: 18,
    borderRadius: 30,
    alignItems: 'center',
  },
  nextButtonText: {
    color: '#0f0f1e',
    fontSize: 16,
    fontWeight: '700',
  },
  generateButton: {
    backgroundColor: '#90EE90',
    margin: 20,
    padding: 18,
    borderRadius: 30,
    alignItems: 'center',
  },
  generateButtonText: {
    color: '#0f0f1e',
    fontSize: 16,
    fontWeight: '700',
  },

  // Destinations Screen
  destinationsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  destinationCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#e0e0e0',
  },
  destinationCardSelected: {
    borderColor: '#90EE90',
    backgroundColor: 'rgba(144, 238, 144, 0.05)',
  },
  destinationEmoji: {
    fontSize: 40,
    marginBottom: 10,
  },
  destinationName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 2,
  },
  destinationCity: {
    fontSize: 13,
    color: '#666',
  },

  // Travel DNA Screen
  optionsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  optionButton: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    borderWidth: 2,
    borderColor: '#e0e0e0',
  },
  optionButtonActive: {
    borderColor: '#90EE90',
    backgroundColor: 'rgba(144, 238, 144, 0.1)',
  },
  optionText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  optionSubtext: {
    fontSize: 10,
    color: '#666',
    letterSpacing: 0.5,
  },
  sliderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  sliderLabel: {
    fontSize: 13,
    color: '#666',
  },
  sliderTrack: {
    flex: 1,
    height: 6,
    backgroundColor: '#e0e0e0',
    borderRadius: 3,
    overflow: 'hidden',
  },
  sliderFill: {
    height: '100%',
    backgroundColor: '#90EE90',
  },
  sliderValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#90EE90',
    textAlign: 'center',
    marginTop: 8,
  },
  climateGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  climateButton: {
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderWidth: 2,
    borderColor: '#e0e0e0',
  },
  climateButtonSelected: {
    borderColor: '#90EE90',
    backgroundColor: 'rgba(144, 238, 144, 0.1)',
  },
  climateText: {
    fontSize: 14,
    color: '#1a1a1a',
  },
  rangePicker: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 4,
  },
  rangeOption: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  rangeOptionSelected: {
    backgroundColor: '#90EE90',
  },
  rangeText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1a1a1a',
  },

  // Final Details Screen
  dateInputs: {
    flexDirection: 'row',
    gap: 12,
  },
  dateInput: {
    flex: 1,
  },
  inputLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 14,
    fontSize: 15,
    color: '#1a1a1a',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  budgetContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  budgetLabel: {
    fontSize: 14,
    color: '#666',
  },
  budgetValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#90EE90',
  },
  budgetRange: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  budgetRangeText: {
    fontSize: 11,
    color: '#999',
  },
  travelWithGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  travelWithCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#e0e0e0',
  },
  travelWithCardSelected: {
    borderColor: '#90EE90',
    backgroundColor: 'rgba(144, 238, 144, 0.1)',
  },
  travelWithIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  travelWithLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1a1a1a',
  },

  // Itinerary Screen
  itineraryHeader: {
    height: 200,
    backgroundColor: '#1a1a2e',
    position: 'relative',
  },
  backButtonCircle: {
    position: 'absolute',
    top: 15,
    left: 15,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 20,
  },
  itineraryHeaderContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  aiTailoredBadge: {
    backgroundColor: 'rgba(144, 238, 144, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginBottom: 12,
  },
  aiTailoredText: {
    color: '#90EE90',
    fontSize: 10,
    fontWeight: '600',
  },
  itineraryTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 4,
  },
  itineraryDates: {
    fontSize: 14,
    color: '#aaa',
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  tab: {
    flex: 1,
    paddingVertical: 16,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabActive: {
    borderBottomColor: '#90EE90',
  },
  tabText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#999',
    letterSpacing: 0.5,
  },
  tabTextActive: {
    color: '#90EE90',
  },
  itineraryContent: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  dayHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    paddingBottom: 10,
  },
  dayBadge: {
    backgroundColor: '#90EE90',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  dayBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#0f0f1e',
  },
  transitMaster: {
    fontSize: 11,
    color: '#666',
    fontWeight: '600',
  },
  tipBox: {
    backgroundColor: '#fff3cd',
    margin: 20,
    marginTop: 0,
    padding: 14,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#90EE90',
  },
  tipText: {
    fontSize: 13,
    color: '#856404',
    lineHeight: 18,
  },
  itineraryItem: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  timelineMarker: {
    width: 30,
    alignItems: 'center',
    paddingTop: 8,
  },
  timelineDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#90EE90',
  },
  timelineLine: {
    width: 2,
    flex: 1,
    backgroundColor: '#e0e0e0',
    marginTop: 4,
  },
  itineraryCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginLeft: 12,
  },
  itineraryCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  itineraryTime: {
    fontSize: 12,
    color: '#90EE90',
    fontWeight: '600',
    marginBottom: 4,
  },
  itineraryName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  viewMapButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#90EE90',
  },
  viewMapText: {
    fontSize: 10,
    color: '#90EE90',
    fontWeight: '600',
  },
  itineraryDescription: {
    fontSize: 13,
    color: '#666',
    lineHeight: 20,
    marginBottom: 12,
  },
  itineraryTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 10,
  },
  tag: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  tagText: {
    fontSize: 10,
    color: '#666',
    fontWeight: '600',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  rating: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  reviews: {
    fontSize: 12,
    color: '#999',
  },
  vipCard: {
    backgroundColor: '#1a1a2e',
    margin: 20,
    padding: 20,
    borderRadius: 16,
  },
  vipBadge: {
    fontSize: 10,
    color: '#90EE90',
    fontWeight: '600',
    marginBottom: 8,
    letterSpacing: 1,
  },
  vipTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 8,
  },
  vipDescription: {
    fontSize: 14,
    color: '#aaa',
    marginBottom: 16,
    lineHeight: 20,
  },
  vipFeatures: {
    marginBottom: 16,
  },
  vipFeature: {
    fontSize: 13,
    color: '#fff',
    marginBottom: 6,
  },
  claimButton: {
    backgroundColor: '#90EE90',
    padding: 14,
    borderRadius: 24,
    alignItems: 'center',
  },
  claimButtonText: {
    color: '#1a1a2e',
    fontSize: 14,
    fontWeight: '700',
  },
});

export default WanderLustApp;
