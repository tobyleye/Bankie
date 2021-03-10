import "./globalStyle";
import { Box, Text } from "./components/";

function App() {
  return (
    <div>
      <Box css={{ height: "100vh", display: "grid", placeItems: "center" }}>
        <Text>Welcome to Bankie</Text>
      </Box>
    </div>
  );
}

export default App;
