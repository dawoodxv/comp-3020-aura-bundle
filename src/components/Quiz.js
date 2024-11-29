import { useState } from "react";
import {
  Box,
  Button,
  Text,
  Stack,
  RadioGroup,
  Radio,
  Progress,
  Flex,
  useTheme,
  Heading,
  Divider,
  Tooltip
} from "@chakra-ui/react";
import { FaArrowLeft } from "react-icons/fa";

const SkinCareQuiz = () => {
  const theme = useTheme();
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({
    skinConcern: "",
    skinType: "",
    skinGoal: "",
    ageRange: "",
  });

  const handleNext = () => {
    if (step < 5) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleAnswerChange = (key, value) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <Box>
      {/* Banner Section */}
      <Box bg={theme.colors.primary} color={theme.colors.accent} py={4}>
        <Heading textAlign="center" fontSize="2xl" fontFamily="inherit">
          Personalized Bundle Quiz
        </Heading>
      </Box>
      <Divider borderColor={theme.colors.textLight} />
      <Flex alignItems="center" justifyContent="center" mt="10vh">
        <Box
          p={6}
          border="1px solid #e2e8f0"
          borderRadius="md"
          minW="35rem"
          textAlign="center"
          boxShadow="lg"
          bg="white"
          position="relative"
        >
          {step > 1 && step <= 5 && (
            <Button
              leftIcon={<FaArrowLeft />}
              variant="link"
              onClick={handleBack}
              position="absolute"
              top="1rem"
              left="1rem"
            >
              Back
            </Button>
          )}

          {step === 1 && (
            <Stack spacing={4} mt={4}>
              <Text fontSize="lg" fontWeight="bold" textAlign="center">
                What is your main skin concern?
              </Text>
              <RadioGroup
                onChange={(value) => handleAnswerChange("skinConcern", value)}
                value={answers.skinConcern}
              >
                <Stack direction="column" spacing={3}>
                  <Radio value="Acne">Acne</Radio>
                  <Radio value="Dryness">Dryness</Radio>
                  <Radio value="Aging">Aging</Radio>
                  <Radio value="Dullness">Dullness</Radio>
                  <Radio value="Skip">Skip</Radio>
                </Stack>
              </RadioGroup>
            </Stack>
          )}

          {step === 2 && (
            <Stack spacing={4} mt={4}>
              <Text fontSize="lg" fontWeight="bold" textAlign="center">
                What is your skin type?
              </Text>
              <RadioGroup
                onChange={(value) => handleAnswerChange("skinType", value)}
                value={answers.skinType}
              >
                <Stack direction="column" spacing={3}>
                  <Radio value="Normal">Normal</Radio>
                  <Radio value="Oily">Oily</Radio>
                  <Radio value="Dry">Dry</Radio>
                  <Radio value="Combination">Combination</Radio>
                  <Radio value="Skip">Skip</Radio>
                </Stack>
              </RadioGroup>
            </Stack>
          )}

          {step === 3 && (
            <Stack spacing={4} mt={4}>
              <Text fontSize="lg" fontWeight="bold" textAlign="center">
                What is your skin goal?
              </Text>
              <RadioGroup
                onChange={(value) => handleAnswerChange("skinGoal", value)}
                value={answers.skinGoal}
              >
                <Stack direction="column" spacing={3}>
                  <Radio value="Clearer Skin">Clearer Skin</Radio>
                  <Radio value="Anti-Aging">Anti-Aging</Radio>
                  <Radio value="Hydration">Hydration</Radio>
                  <Radio value="Radiance">Radiance</Radio>
                  <Radio value="Skip">Skip</Radio>
                </Stack>
              </RadioGroup>
            </Stack>
          )}

          {step === 4 && (
            <Stack spacing={4} mt={4}>
              <Text fontSize="lg" fontWeight="bold" textAlign="center">
                How old are you?
              </Text>
              <RadioGroup
                onChange={(value) => handleAnswerChange("ageRange", value)}
                value={answers.ageRange}
              >
                <Stack direction="column" spacing={3}>
                  <Radio value="Under 20">Under 20</Radio>
                  <Radio value="20-29">20-29</Radio>
                  <Radio value="30-39">30-39</Radio>
                  <Radio value="40-49">40-49</Radio>
                  <Radio value="50+">50+</Radio>
                  <Radio value="Skip">Skip</Radio>
                </Stack>
              </RadioGroup>
            </Stack>
          )}

          {step === 5 && (
            <Stack spacing={4} textAlign="left" mt={4}>
              <Text fontSize="lg" fontWeight="bold" textAlign="center">
                Your Responses
              </Text>
              <Text>
                <strong>Skin Concern:</strong> {answers.skinConcern || "N/A"}
              </Text>
              <Text>
                <strong>Skin Type:</strong> {answers.skinType || "N/A"}
              </Text>
              <Text>
                <strong>Skin Goal:</strong> {answers.skinGoal || "N/A"}
              </Text>
              <Text>
                <strong>Age Range:</strong> {answers.ageRange || "N/A"}
              </Text>
              <Tooltip label = "This is where the horizontal implementation ends. This button will return a personalized bundle for the user to either favorite or add to bag.">
                <Button
                  mt={4}
                  bg={theme.colors.secondary}
                  color={"white"}
                  _hover={{
                    bg: theme.colors.tertiary,
                    boxShadow: "inset 0 0 5px rgba(0, 0, 0, 0.5)",
                  }}
                  size="lg"
                  width="100%"
                  boxShadow="inset 0 0 5px rgba(0, 0, 0, 0.3)"
                >
                  Get Personalized Bundle
                </Button>
              </Tooltip>
            </Stack>
          )}

          {step < 5 && (
            <Button
              mt={6}
              bg={theme.colors.secondary}
              color={"white"}
              _hover={{
                bg: theme.colors.tertiary,
                boxShadow: "inset 0 0 5px rgba(0, 0, 0, 0.5)",
              }}
              size="lg"
              width="100%"
              boxShadow="inset 0 0 5px rgba(0, 0, 0, 0.3)"
              onClick={handleNext}
              isDisabled={
                (step === 1 && !answers.skinConcern) ||
                (step === 2 && !answers.skinType) ||
                (step === 3 && !answers.skinGoal) ||
                (step === 4 && !answers.ageRange)
              }
            >
              Next
            </Button>
          )}

          <Progress
            value={(step / 5) * 100}
            size="sm"
            mt={4}
            colorScheme="green"
          />
        </Box>
      </Flex>
    </Box>
    
  );
};

export default SkinCareQuiz;
