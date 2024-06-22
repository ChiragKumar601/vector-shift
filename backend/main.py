

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional, Dict

# Position coordinates for Position {x,y}
class Position(BaseModel):
    x: float
    y: float

class NodeData(BaseModel):
    id: str
    nodeType: str

class Node(BaseModel):
    id: str
    type: str
    position: Position
    data: NodeData
    width: int
    height: int
    selected: bool = False
    positionAbsolute: Optional[Position] = None
    dragging: bool = False

class EdgeData(BaseModel):
    type: str
    height: str
    width: str

class Edge(BaseModel):
    source: str
    sourceHandle: str
    target: str
    targetHandle: str
    type: str
    animated: bool
    markerEnd: EdgeData
    id: str

class GraphData(BaseModel):
    nodes: List[Node]
    edges: List[Edge]

app = FastAPI()

origins = [
    "http://localhost:3000",
    "http://localhost:8000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["POST"],
    allow_headers=["*"],
)

# Create graph from edges
def create_graph(edges: List[Edge]) -> Dict[str, List[str]]:
    graph = {}
    for edge in edges:
        if edge.source not in graph:
            graph[edge.source] = []
        graph[edge.source].append(edge.target)
    return graph

# Detect cycle in the graph using DFS
def has_cycle(graph: Dict[str, List[str]], nodes: List[Node]) -> bool:
    visited = set()
    stack = set()

    def dfs(node: str) -> bool:
        if node in stack:
            return True  # Found a cycle
        if node in visited:
            return False  # Already visited node, no cycle here
        
        visited.add(node)
        stack.add(node)

        for neighbor in graph.get(node, []):
            if dfs(neighbor):
                return True

        stack.remove(node)
        return False

    for node in nodes:
        if node.id not in visited:
            if dfs(node.id):
                return True  # Cycle detected

    return False  # No cycle found

# Update handle_setup to process all nodes
@app.post("/setup")
async def handle_setup(graph_data: GraphData):
    nodes = graph_data.nodes
    edges = graph_data.edges

    graph = create_graph(edges)
    is_dag = has_cycle(graph, nodes)

    # Ensure all nodes are considered, including isolated ones
    isolated_nodes = [node for node in nodes if node.id not in graph]
    if isolated_nodes:
        print("Isolated nodes:", isolated_nodes)

    return {"num_nodes": len(nodes), "num_edges": len(edges), "is_dag": is_dag}

@app.get("/")
def read_root():
    return {"Ping": "Pong"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
