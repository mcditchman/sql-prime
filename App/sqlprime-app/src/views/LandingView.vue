<template>
    <div class="landing-page">
      <!-- Hero Section -->
      <header class="bg-gradient-to-r from-primary-dark to-primary-main text-text-inverse min-h-[70vh] flex flex-col justify-center">
        <div class="container mx-auto px-6 py-12">
          <div class="flex flex-col md:flex-row items-center">
            <div class="md:w-1/2 mb-8 md:mb-0">
              <h1 class="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                Optimize your SQL queries like never before
              </h1>
              <p class="text-xl mb-6 text-secondary-light">
                SQLPrime helps developers analyze and improve database performance with intelligent recommendations and powerful visualizations.
              </p>
              <div class="flex flex-col sm:flex-row gap-4">
                <button 
                  class="btn px-6 py-3 bg-success hover:bg-opacity-90 text-text-inverse font-medium rounded-lg text-lg transition duration-300"
                  @click="scrollToFeatures"
                >
                  Explore Features
                </button>
                <button 
                  class="btn px-6 py-3 bg-secondary-light hover:bg-secondary-main text-primary-dark font-medium rounded-lg text-lg transition duration-300"
                  @click="scrollToDemo"
                >
                  See Demo
                </button>
              </div>
            </div>
            <div class="md:w-1/2 flex justify-center md:justify-end">
              <div class="relative bg-primary-light p-4 rounded-lg shadow-lg w-full max-w-lg">
                <div class="text-secondary-light text-sm font-mono mb-2">-- Optimized query example</div>
                <pre class="bg-primary-dark p-4 rounded text-success font-mono text-sm overflow-x-auto">
  SELECT o.order_id, c.customer_name, p.product_name
  FROM orders o
  JOIN customers c ON o.customer_id = c.customer_id
  JOIN order_items oi ON o.order_id = oi.order_id
  JOIN products p ON oi.product_id = p.product_id
  WHERE o.order_date > '2023-01-01'
    AND p.category = 'Electronics'</pre>
                <div class="absolute -bottom-3 -right-3 bg-success text-white text-xs px-2 py-1 rounded font-semibold">
                  50% Faster
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
  
      <!-- Features Section -->
      <section id="features" class="py-16 bg-secondary-light">
        <div class="container mx-auto px-6">
          <h2 class="text-3xl font-semibold text-center mb-12 text-primary-dark">Powerful Features</h2>
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <!-- Feature 1 -->
            <div class="feature-card bg-white p-6 rounded-lg shadow-md border border-secondary-main hover:shadow-lg transition-shadow duration-300">
              <div class="text-info text-4xl mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 class="text-xl font-semibold mb-2 text-primary-dark">Visual Execution Plans</h3>
              <p class="text-text-secondary">Visualize SQL execution plans with interactive diagrams to quickly identify bottlenecks and optimization opportunities.</p>
            </div>
            
            <!-- Feature 2 -->
            <div class="feature-card bg-white p-6 rounded-lg shadow-md border border-secondary-main hover:shadow-lg transition-shadow duration-300">
              <div class="text-success text-4xl mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 class="text-xl font-semibold mb-2 text-primary-dark">AI-Powered Recommendations</h3>
              <p class="text-text-secondary">Get intelligent index suggestions and query rewrites based on advanced pattern recognition and database best practices.</p>
            </div>
            
            <!-- Feature 3 -->
            <div class="feature-card bg-white p-6 rounded-lg shadow-md border border-secondary-main hover:shadow-lg transition-shadow duration-300">
              <div class="text-warning text-4xl mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 class="text-xl font-semibold mb-2 text-primary-dark">Query History & Comparison</h3>
              <p class="text-text-secondary">Track query performance over time and compare different versions to ensure continuous improvement.</p>
            </div>
            
            <!-- Feature 4 -->
            <div class="feature-card bg-white p-6 rounded-lg shadow-md border border-secondary-main hover:shadow-lg transition-shadow duration-300">
              <div class="text-info text-4xl mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                </svg>
              </div>
              <h3 class="text-xl font-semibold mb-2 text-primary-dark">Multi-Database Support</h3>
              <p class="text-text-secondary">Connect to SQL Server, MySQL, PostgreSQL, and other popular database engines with tailored optimizations for each.</p>
            </div>
            
            <!-- Feature 5 -->
            <div class="feature-card bg-white p-6 rounded-lg shadow-md border border-secondary-main hover:shadow-lg transition-shadow duration-300">
              <div class="text-error text-4xl mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 class="text-xl font-semibold mb-2 text-primary-dark">Secure Connection Management</h3>
              <p class="text-text-secondary">Store and manage database connections securely with end-to-end encryption and role-based access control.</p>
            </div>
            
            <!-- Feature 6 -->
            <div class="feature-card bg-white p-6 rounded-lg shadow-md border border-secondary-main hover:shadow-lg transition-shadow duration-300">
              <div class="text-success text-4xl mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 class="text-xl font-semibold mb-2 text-primary-dark">Enterprise-Grade Security</h3>
              <p class="text-text-secondary">Keep your data secure with encrypted connections, session management, and comprehensive audit logs.</p>
            </div>
          </div>
        </div>
      </section>
  
      <!-- Interactive Demo Section -->
      <section id="demo" class="py-16 bg-white">
        <div class="container mx-auto px-6">
          <h2 class="text-3xl font-semibold text-center mb-4 text-primary-dark">See SQLPrime in Action</h2>
          <p class="text-center text-text-secondary mb-12 max-w-3xl mx-auto">Watch how SQLPrime analyzes queries, provides recommendations, and visualizes execution plans to improve database performance.</p>
          
          <div class="max-w-4xl mx-auto bg-primary-light rounded-lg shadow-lg overflow-hidden">
            <div class="demo-tabs flex border-b border-primary-main">
              <button 
                class="tab-button px-6 py-3 font-medium transition-colors duration-200"
                :class="activeTab === 'analyze' ? 'bg-primary-main text-white' : 'bg-primary-light text-secondary-light'"
                @click="activeTab = 'analyze'"
              >
                Analyze Query
              </button>
              <button 
                class="tab-button px-6 py-3 font-medium transition-colors duration-200"
                :class="activeTab === 'visualize' ? 'bg-primary-main text-white' : 'bg-primary-light text-secondary-light'"
                @click="activeTab = 'visualize'"
              >
                Execution Plan
              </button>
              <button 
                class="tab-button px-6 py-3 font-medium transition-colors duration-200"
                :class="activeTab === 'recommend' ? 'bg-primary-main text-white' : 'bg-primary-light text-secondary-light'"
                @click="activeTab = 'recommend'"
              >
                Recommendations
              </button>
            </div>
            
            <div class="tab-content p-6">
              <!-- Analyze Query Tab -->
              <div v-if="activeTab === 'analyze'" class="animate-fade-in">
                <div class="code-editor p-4 bg-primary-dark rounded-lg mb-4 font-mono text-secondary-light text-sm" style="height: 200px; overflow: auto;">
                  <div class="line"><span class="text-info">SELECT</span> p.ProductName, c.CategoryName, s.CompanyName, 
                    <span class="text-success">COUNT</span>(od.OrderID) <span class="text-info">AS</span> OrderCount,
                    <span class="text-success">SUM</span>(od.Quantity) <span class="text-info">AS</span> TotalQuantity</div>
                  <div class="line"><span class="text-info">FROM</span> Products p</div>
                  <div class="line"><span class="text-info">JOIN</span> Categories c <span class="text-info">ON</span> p.CategoryID = c.CategoryID</div>
                  <div class="line"><span class="text-info">JOIN</span> Suppliers s <span class="text-info">ON</span> p.SupplierID = s.SupplierID</div>
                  <div class="line"><span class="text-info">JOIN</span> [Order Details] od <span class="text-info">ON</span> p.ProductID = od.ProductID</div>
                  <div class="line"><span class="text-info">JOIN</span> Orders o <span class="text-info">ON</span> od.OrderID = o.OrderID</div>
                  <div class="line"><span class="text-info">WHERE</span> o.OrderDate > <span class="text-warning">'2022-01-01'</span></div>
                  <div class="line"><span class="text-info">GROUP BY</span> p.ProductName, c.CategoryName, s.CompanyName</div>
                  <div class="line"><span class="text-info">ORDER BY</span> TotalQuantity <span class="text-info">DESC</span></div>
                </div>
                
                <div class="flex justify-end">
                  <button class="btn px-4 py-2 bg-success text-white rounded font-medium flex items-center" @click="activeTab = 'visualize'">
                    <span>Analyze Query</span>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
              
              <!-- Execution Plan Tab -->
              <div v-if="activeTab === 'visualize'" class="animate-fade-in">
                <div class="execution-plan bg-white p-4 rounded-lg border border-secondary-main" style="height: 300px;">
                  <!-- Simplified execution plan visualization -->
                  <svg width="100%" height="100%" viewBox="0 0 800 250">
                    <!-- Connector lines -->
                    <line x1="400" y1="50" x2="200" y2="100" stroke="#94A3B8" stroke-width="2"></line>
                    <line x1="400" y1="50" x2="600" y2="100" stroke="#94A3B8" stroke-width="2"></line>
                    <line x1="200" y1="100" x2="100" y2="150" stroke="#94A3B8" stroke-width="2"></line>
                    <line x1="200" y1="100" x2="300" y2="150" stroke="#94A3B8" stroke-width="2"></line>
                    <line x1="600" y1="100" x2="500" y2="150" stroke="#94A3B8" stroke-width="2"></line>
                    <line x1="600" y1="100" x2="700" y2="150" stroke="#94A3B8" stroke-width="2"></line>
                    <line x1="300" y1="150" x2="300" y2="200" stroke="#94A3B8" stroke-width="2"></line>
                    <line x1="500" y1="150" x2="500" y2="200" stroke="#94A3B8" stroke-width="2"></line>
                    
                    <!-- Operation nodes -->
                    <g transform="translate(400, 50)">
                      <rect x="-60" y="-20" width="120" height="40" rx="5" fill="#3B82F6" class="hover:opacity-90 cursor-pointer"></rect>
                      <text x="0" y="5" text-anchor="middle" fill="white" font-size="12">Sort (Cost: 30%)</text>
                    </g>
                    
                    <g transform="translate(200, 100)">
                      <rect x="-60" y="-20" width="120" height="40" rx="5" fill="#F59E0B" class="hover:opacity-90 cursor-pointer"></rect>
                      <text x="0" y="5" text-anchor="middle" fill="white" font-size="12">Hash Match (Cost: 25%)</text>
                    </g>
                    
                    <g transform="translate(600, 100)">
                      <rect x="-60" y="-20" width="120" height="40" rx="5" fill="#3B82F6" class="hover:opacity-90 cursor-pointer"></rect>
                      <text x="0" y="5" text-anchor="middle" fill="white" font-size="12">Hash Group (Cost: 15%)</text>
                    </g>
                    
                    <g transform="translate(100, 150)">
                      <rect x="-60" y="-20" width="120" height="40" rx="5" fill="#10B981" class="hover:opacity-90 cursor-pointer"></rect>
                      <text x="0" y="5" text-anchor="middle" fill="white" font-size="12">Index Seek (Cost: 5%)</text>
                    </g>
                    
                    <g transform="translate(300, 150)">
                      <rect x="-60" y="-20" width="120" height="40" rx="5" fill="#EF4444" class="hover:opacity-90 cursor-pointer"></rect>
                      <text x="0" y="5" text-anchor="middle" fill="white" font-size="12">Table Scan (Cost: 15%)</text>
                    </g>
                    
                    <g transform="translate(500, 150)">
                      <rect x="-60" y="-20" width="120" height="40" rx="5" fill="#10B981" class="hover:opacity-90 cursor-pointer"></rect>
                      <text x="0" y="5" text-anchor="middle" fill="white" font-size="12">Index Seek (Cost: 5%)</text>
                    </g>
                    
                    <g transform="translate(700, 150)">
                      <rect x="-60" y="-20" width="120" height="40" rx="5" fill="#10B981" class="hover:opacity-90 cursor-pointer"></rect>
                      <text x="0" y="5" text-anchor="middle" fill="white" font-size="12">Index Seek (Cost: 5%)</text>
                    </g>
                    
                    <g transform="translate(300, 200)">
                      <rect x="-60" y="-20" width="120" height="40" rx="5" fill="#EF4444" class="hover:opacity-90 cursor-pointer"></rect>
                      <text x="0" y="5" text-anchor="middle" fill="white" font-size="12">Table Scan (Cost: 10%)</text>
                    </g>
                    
                    <g transform="translate(500, 200)">
                      <rect x="-60" y="-20" width="120" height="40" rx="5" fill="#EF4444" class="hover:opacity-90 cursor-pointer"></rect>
                      <text x="0" y="5" text-anchor="middle" fill="white" font-size="12">Table Scan (Cost: 10%)</text>
                    </g>
                  </svg>
                </div>
                
                <div class="text-center mt-4">
                  <div class="inline-flex items-center bg-error bg-opacity-10 text-error px-4 py-2 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <span>Performance bottleneck detected: Table Scans on multiple tables</span>
                  </div>
                </div>
                
                <div class="flex justify-between mt-4">
                  <button class="btn px-4 py-2 bg-secondary-main text-primary-dark rounded font-medium flex items-center" @click="activeTab = 'analyze'">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                    </svg>
                    <span>Back</span>
                  </button>
                  <button class="btn px-4 py-2 bg-success text-white rounded font-medium flex items-center" @click="activeTab = 'recommend'">
                    <span>View Recommendations</span>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
              
              <!-- Recommendations Tab -->
              <div v-if="activeTab === 'recommend'" class="animate-fade-in">
                <div class="recommendations space-y-4">
                  <div class="recommendation bg-white p-4 rounded-lg border border-success border-l-4">
                    <div class="flex justify-between items-start">
                      <div>
                        <h4 class="font-semibold text-primary-dark">Add Index to Order Details Table</h4>
                        <p class="text-text-secondary text-sm mt-1">Create a non-clustered index on OrderID and ProductID columns to eliminate table scan.</p>
                      </div>
                      <div class="flex space-x-2">
                        <span class="bg-success bg-opacity-10 text-success text-xs px-2 py-1 rounded font-medium">High Impact</span>
                        <span class="bg-secondary-light text-text-secondary text-xs px-2 py-1 rounded font-medium">+35% Performance</span>
                      </div>
                    </div>
                    <div class="mt-3 bg-secondary-light p-3 rounded text-sm font-mono text-text-primary">
                      CREATE NONCLUSTERED INDEX IX_OrderDetails_ProductID_OrderID<br>
                      ON [Order Details] (ProductID, OrderID);
                    </div>
                  </div>
                  
                  <div class="recommendation bg-white p-4 rounded-lg border border-warning border-l-4">
                    <div class="flex justify-between items-start">
                      <div>
                        <h4 class="font-semibold text-primary-dark">Optimize Join Order</h4>
                        <p class="text-text-secondary text-sm mt-1">Rewrite query to optimize join order and reduce intermediate result sets.</p>
                      </div>
                      <div class="flex space-x-2">
                        <span class="bg-warning bg-opacity-10 text-warning text-xs px-2 py-1 rounded font-medium">Medium Impact</span>
                        <span class="bg-secondary-light text-text-secondary text-xs px-2 py-1 rounded font-medium">+20% Performance</span>
                      </div>
                    </div>
                    <div class="mt-3 bg-secondary-light p-3 rounded text-sm font-mono text-text-primary">
                      -- Reordered joins to filter early<br>
                      SELECT p.ProductName, c.CategoryName, s.CompanyName, 
                        COUNT(od.OrderID) AS OrderCount,
                        SUM(od.Quantity) AS TotalQuantity<br>
                      FROM Orders o<br>
                      JOIN [Order Details] od ON o.OrderID = od.OrderID<br>
                      JOIN Products p ON od.ProductID = p.ProductID<br>
                      JOIN Categories c ON p.CategoryID = c.CategoryID<br>
                      JOIN Suppliers s ON p.SupplierID = s.SupplierID<br>
                      WHERE o.OrderDate > '2022-01-01'<br>
                      GROUP BY p.ProductName, c.CategoryName, s.CompanyName<br>
                      ORDER BY TotalQuantity DESC
                    </div>
                  </div>
                  
                  <div class="recommendation bg-white p-4 rounded-lg border border-info border-l-4">
                    <div class="flex justify-between items-start">
                      <div>
                        <h4 class="font-semibold text-primary-dark">Add Covering Index for Categories</h4>
                        <p class="text-text-secondary text-sm mt-1">Create a covering index that includes both join and output columns.</p>
                      </div>
                      <div class="flex space-x-2">
                        <span class="bg-info bg-opacity-10 text-info text-xs px-2 py-1 rounded font-medium">Low Impact</span>
                        <span class="bg-secondary-light text-text-secondary text-xs px-2 py-1 rounded font-medium">+10% Performance</span>
                      </div>
                    </div>
                    <div class="mt-3 bg-secondary-light p-3 rounded text-sm font-mono text-text-primary">
                      CREATE NONCLUSTERED INDEX IX_Categories_CategoryID_CategoryName<br>
                      ON Categories (CategoryID)<br>
                      INCLUDE (CategoryName);
                    </div>
                  </div>
                </div>
                
                <div class="flex justify-between mt-6">
                  <button class="btn px-4 py-2 bg-secondary-main text-primary-dark rounded font-medium flex items-center" @click="activeTab = 'visualize'">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                    </svg>
                    <span>Back</span>
                  </button>
                  <button class="btn px-4 py-2 bg-success text-white rounded font-medium flex items-center">
                    <span>Apply Recommendations</span>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
  
      <!-- Call to Action Section -->
      <section class="py-16 bg-gradient-to-r from-primary-dark to-primary-main text-text-inverse">
        <div class="container mx-auto px-6 text-center">
          <h2 class="text-3xl md:text-4xl font-bold mb-6">Ready to supercharge your database performance?</h2>
          <p class="text-xl mb-8 max-w-3xl mx-auto text-secondary-light">Join thousands of developers who use SQLPrime to optimize their queries and improve application performance.</p>
          
          <div class="flex flex-col sm:flex-row justify-center gap-4">
            <button class="btn px-8 py-4 bg-success hover:bg-opacity-90 text-white font-semibold rounded-lg text-lg transition duration-300">
              Start Your Free Trial
            </button>
            <button class="btn px-8 py-4 bg-white hover:bg-secondary-light text-primary-dark font-semibold rounded-lg text-lg transition duration-300">
              Schedule a Demo
            </button>
          </div>
          
          <p class="mt-6 text-secondary-light">No credit card required. 14-day free trial.</p>
        </div>
      </section>
  
      <!-- Footer -->
      <footer class="bg-primary-dark text-text-inverse py-12">
        <div class="container mx-auto px-6">
          <div class="flex flex-col md:flex-row justify-between">
            <div class="mb-6 md:mb-0">
              <h2 class="text-2xl font-bold">SQLPrime</h2>
              <p class="text-secondary-light mt-2">Optimize your database performance</p>
            </div>
            
            <div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center md:text-left">
              <div>
                <h3 class="text-lg font-semibold mb-3">Product</h3>
                <ul class="space-y-2">
                  <li><a href="#" class="text-secondary-light hover:text-white">Features</a></li>
                  <li><a href="#" class="text-secondary-light hover:text-white">Pricing</a></li>
                  <li><a href="#" class="text-secondary-light hover:text-white">Roadmap</a></li>
                  <li><a href="#" class="text-secondary-light hover:text-white">Release Notes</a></li>
                </ul>
              </div>
              
              <div>
                <h3 class="text-lg font-semibold mb-3">Resources</h3>
                <ul class="space-y-2">
                  <li><a href="#" class="text-secondary-light hover:text-white">Documentation</a></li>
                  <li><a href="#" class="text-secondary-light hover:text-white">Tutorials</a></li>
                  <li><a href="#" class="text-secondary-light hover:text-white">Blog</a></li>
                  <li><a href="#" class="text-secondary-light hover:text-white">Community</a></li>
                </ul>
              </div>
              
              <div>
                <h3 class="text-lg font-semibold mb-3">Company</h3>
                <ul class="space-y-2">
                  <li><a href="#" class="text-secondary-light hover:text-white">About</a></li>
                  <li><a href="#" class="text-secondary-light hover:text-white">Careers</a></li>
                  <li><a href="#" class="text-secondary-light hover:text-white">Contact</a></li>
                  <li><a href="#" class="text-secondary-light hover:text-white">Press</a></li>
                </ul>
              </div>
              
              <div>
                <h3 class="text-lg font-semibold mb-3">Legal</h3>
                <ul class="space-y-2">
                  <li><a href="#" class="text-secondary-light hover:text-white">Privacy</a></li>
                  <li><a href="#" class="text-secondary-light hover:text-white">Terms</a></li>
                  <li><a href="#" class="text-secondary-light hover:text-white">Security</a></li>
                  <li><a href="#" class="text-secondary-light hover:text-white">Licenses</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// Define reactive properties
const activeTab = ref('analyze');

// Define methods
const scrollToFeatures = () => {
  document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
};

const scrollToDemo = () => {
  document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' });
};
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
</style>