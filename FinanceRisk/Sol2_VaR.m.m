
%1a)

Data = readmatrix('timeSeries.xlsx', 'sheet', 'Problem_1_and_2','Range','C2:Q1648');
%Data = flip(Data(1:end,:));


weights = ones(15,1) / (size(Data,2));

Returns = zeros(size(Data,1)-1, size(Data,2));

for i = 1:size(Returns,1)
    for j = 1:size(Returns,2)
        Returns(i,j) = (Data(i+1,j)-Data(i,j))/Data(i,j);
    end
end

co_variance = cov(Returns);
mean_returns = mean(Returns);
sum_returns = sum(mean_returns*weights);

volatility_portfolio = sqrt(weights'*co_variance*weights);


% 95% ci
alpha=0.05;
Var_varcov95=(-sum_returns+norminv(1-alpha)*volatility_portfolio)*10000000;

% 97,5% ci
alpha=0.025;
Var_varcov975=(-sum_returns+norminv(1-alpha)*volatility_portfolio)*10000000;

% 99% ci
alpha=0.01;
Var_varcov99=(-sum_returns+norminv(1-alpha)*volatility_portfolio)*10000000;


 %---------------------------------------------------

%b)

changing_weights = readmatrix('timeSeries.xlsx', 'sheet', 'Problem_1_and_2','Range','AY2:BM1648');
log_returns = readmatrix('timeSeries.xlsx', 'sheet', 'Problem_1_and_2','Range','R3:AF1648');

Portfolio_value_t = zeros(size(Data,1) -1, 1);

Portfolio_value_t(1) = 10000000;

for i = 2:size(Portfolio_value_t,1)
    sum_portfolio_changes = 0;
    for j = 1:size(Returns ,2)
        sum_portfolio_changes = sum_portfolio_changes + Returns(i,j)*changing_weights(i,j);
    end
    Portfolio_value_t(i) = Portfolio_value_t(i-1) + sum_portfolio_changes;
end

variance_portfolio_cw = readmatrix('timeSeries.xlsx', 'sheet', 'Problem_1_and_2','Range','AX3:AX1648');

volatility_portfolio_cw = sqrt(variance_portfolio_cw);

Var_portfolio_95 = zeros(size(volatility_portfolio_cw,1),1);
Var_portfolio_99 = zeros(size(volatility_portfolio_cw,1),1);

for i = 502:size(variance_portfolio_cw,1)
    alpha = 0.05;
    Var_portfolio_95(i) = (1 - exp(-norminv(1-alpha)*volatility_portfolio_cw(i)));
    alpha = 0.01;
    Var_portfolio_99(i) = (1 - exp(-norminv(1-alpha)*volatility_portfolio_cw(i)));
end


 %---------------------------------------------------

%c)


confidenceLevel95 = 0.05;
confidenceLevel99 = 0.01;
VaR95 = zeros(size(Returns,1), 1);
VaR99 = zeros(size(Returns,1), 1);
ES95 = zeros(size(Returns,1), 1);

R_portfolio = readmatrix('timeSeries.xlsx', 'sheet', 'Problem_1_and_2','Range','AV3:AV1648');


for t = 502:size(R_portfolio,1)
    Hist_Returns = sort(R_portfolio(t-501:t, :));

    % Calculate the portfolio weights at time t

    VaR95(t) = -prctile(Hist_Returns, confidenceLevel95 * 100);
    VaR99(t) = -prctile(Hist_Returns, confidenceLevel99 * 100);

  %Calculate Expected Shortfall at 95% confidence level

  sort_returns = sort(Returns(t-501:t, :));
  ES95(t) = mean(sort_returns(1:25));

end

%--------------------------------------------------

%d)
variance_portfolio_502 = zeros(size(R_portfolio,1),1);
R_Hull_White = zeros(size(R_portfolio,1),1);


R_mean_20 = mean(R_portfolio(1:20));
tmp = 0;
for i = 1:20 
    tmp = tmp + (R_portfolio(i)-R_mean_20)^2;
end
initiated_variance = tmp/19;
variance_portfolio_502(2) = initiated_variance;

for t = 3:size(variance_portfolio_502)
    variance_portfolio_502(t) = 0.94*variance_portfolio_502(t-1) + (1-0.94)*R_portfolio(t-1)^2;
end
        


volatility_portfolio_502 = sqrt(variance_portfolio_502);

Residuals = R_portfolio./volatility_portfolio_502;
Residuals(1) = 0;

VaR_Hull_White_95 = zeros(size(R_portfolio,1),1);
VaR_Hull_White_99 = zeros(size(R_portfolio,1),1);
for t = 502:size(R_portfolio,1)

temp = Residuals(t-500:t-1)*volatility_portfolio_502(t);
VaR_Hull_White_95(t) = prctile(temp,95);
VaR_Hull_White_99(t) = prctile(temp,99);
% volatility_portfolio_t = std(R_portfolio(t-500:t));
% 
% R_Hull_White(t) = R_portfolio(t)*volatility_portfolio_t/volatility_portfolio_502(t);

end

 %PLOTS B-D%

 figure;

 subplot(3,2,1)
 plot(Var_portfolio_95);
 title('1b) VaR Port at 95% CI');
 
 subplot(3,2,2)
 plot(Var_portfolio_99);
 title('1b) VaR Port at 99% CI');

 subplot(3,2,3)
 plot(VaR95);
 title('1c) VaR Port at 95% CI');

 subplot(3,2,4)
 plot(VaR99);
 title('1c) VaR Port at 99% CI');

 subplot(3,2,5)
 plot(VaR_Hull_White_95);
 title('1d) VaR Port at 95% CI');

 subplot(3,2,6)
 plot(VaR_Hull_White_99);
 title('1d) VaR Port at 95% CI');
 %---------------------------------------------------
 %e)

 c = 0.05;
 alpha1 = 0.05;
 alpha2 = 0.01;
 failures_b_95 = sum(R_portfolio(501:end) < -Var_portfolio_95(501:end));
 failures_b_99 = sum(R_portfolio(501:end) < -Var_portfolio_99(501:end));

 failures_c_95 = sum(R_portfolio(501:end) < -VaR95(501:end));
 failures_c_99 = sum(R_portfolio(501:end) < -VaR99(501:end));

 failures_d_95 = sum(R_portfolio(501:end) < -VaR_Hull_White_95(501:end));
 failures_d_99 = sum(R_portfolio(501:end) < -VaR_Hull_White_99(501:end));

 Total_tries = size(R_portfolio(501:end));

 hypthesis0_b_95 = Failure_Rate_Test(failures_b_95, alpha1, Total_tries);
 hypthesis0_b_99 = Failure_Rate_Test(failures_b_99, alpha2, Total_tries);
 hypthesis0_c_95 = Failure_Rate_Test(failures_c_95, alpha1, Total_tries);
 hypthesis0_c_99 = Failure_Rate_Test(failures_c_99, alpha2, Total_tries);
 hypthesis0_d_95 = Failure_Rate_Test(failures_d_95, alpha1, Total_tries);
 hypthesis0_d_99 = Failure_Rate_Test(failures_d_99, alpha2, Total_tries);


%---------------------------------------------------


%f)


chris_test_b_95 = ChristoffersenTest(R_portfolio,Var_portfolio_95);
chris_test_b_99 = ChristoffersenTest(R_portfolio,Var_portfolio_99);

chris_test_c_95 = ChristoffersenTest(R_portfolio,VaR95);
chris_test_c_99 = ChristoffersenTest(R_portfolio,VaR99);

chris_test_d_95 = ChristoffersenTest(R_portfolio, VaR_Hull_White_95);
chris_test_d_99 = ChristoffersenTest(R_portfolio, VaR_Hull_White_99);


%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

%2a)
VaR99_2a = 0.08722;
Beta = 0.026011;
xi = -0.03735;
n_u = 82.3;
u = 0.046591;
sum_2a = 220.2995;


%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

%2b)

figure;
yyaxis left;
plot(R_portfolio);
ylabel('Weekly Portfolio Returns');

yyaxis right;
plot(volatility_portfolio_cw);
ylabel('Rolling Portfolio Volatility with changing weights');
xlabel('Weeks');
title('Weekly Returns and Rolling Volatility');

%based on chart we choose week 400-652%

beta_2b = 0.016796;
xi_2b = 2.868585;
n_2b = 261;
n_u_2b = 13;
sum_2b = 25.42862;



Largest_losses = readmatrix("timeSeries.xlsx", "Sheet", "EVT2a", "Range", "D2:D83");
ETV_formula = readmatrix("timeSeries.xlsx", "Sheet", "EVT2a", "Range", "F2:F83");

figure;

histogram(Largest_losses, 'Normalization', 'pdf');
hold on;

etv_dist = fitdist(ETV_formula, 'Normal');

x_values = min(ETV_formula):0.1:max(ETV_formula);

pdf_values = pdf(etv_dist, x_values);


plot(x_values, pdf_values, 'LineWidth', 2);

% Labels and title
xlabel('Value');
ylabel('Probability Density');
title('Largest Losses and ETV Formula Distribution');

% Add legend
legend('Largest Losses (Histogram)', 'ETV Formula (Normal Dist)', 'Location', 'Best');

% Show grid
grid on;

%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

%3a)

Data2 = readmatrix("timeSeries.xlsx", "Sheet", "Problem 3", "Range", "C4:E3429");
Bidask = readmatrix("timeSeries.xlsx", "Sheet", "Problem 3", "Range", "H4:J6");

S = Data2(1,1);
K1 = 4700;
K2 = 4600;
K3 = 4750;
r = Data2(1,3)/100;
T1 = days252bus('1/10/2022', '3/22/2022')/252;
T2 = days252bus('1/10/2022', '3/22/2022')/252;
T3 = days252bus('1/10/2022', '4/22/2022')/252;
q = 0.05;

IV1 = (Bidask(1,1) + Bidask(1,2))/200;
IV2 = (Bidask(2,1) + Bidask(2,2))/200;
IV3 = (Bidask(3,1) + Bidask(3,2))/200;

[Call1, Put1] = blsprice(S,K1,r, T1,IV1,q);
[Call2, Put2] = blsprice(S,K2,r, T2,IV2,q);
[Call3, Put3] = blsprice(S,K3,r, T3,IV3,q);

Vega1 = blsvega(S,K1,r,T1,IV1,q);
Vega2 = blsvega(S,K2,r,T2,IV2,q);
Vega3 = blsvega(S,K3,r,T3,IV3,q);

Delta1 = blsdelta(S,K1,r,T1,IV1,q);
[Delta2, Delta2put] = blsdelta(S,K2,r,T2,IV2,q);
Delta3 = blsdelta(S,K3,r,T3,IV3,q);

Rho1 = blsrho(S,K1,r,T1,IV1,q);
[Rho2, Rho2put] = blsrho(S,K2,r,T2,IV2,q);
Rho3 = blsrho(S,K3,r,T3,IV3,q);

gv = [[Delta1, Vega1, Rho1]' [Delta2put, Vega2, Rho2put]' [Delta3, Vega3, Rho3]'];

SPXen = (Data2(1:end-1,1) - Data2(2:end,1));
VIXen = (Data2(1:end-1,2) - Data2(2:end,2))/100;
USDen = (Data2(1:end-1,3) - Data2(2:end,3))/100;

covariance = cov([SPXen VIXen USDen]);

holdings = [10000 10000 20000];

variance_3a = gv'*covariance*gv;

Portfolio_value_3a = holdings*[Call1; Put2; Call3];

variance_portfolio_3a = holdings*variance_3a*holdings'/(Portfolio_value_3a^2);

VaR99_3a = Portfolio_value_3a*norminv(0.99)*sqrt(variance_portfolio_3a);


%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

%3b)

Marginal_contribution = norminv(0.99)*gv*covariance*gv*holdings'/sqrt(Portfolio_value_3a);

%%%%%%%%%%%%%%   FUNCTIONS  %%%%%%%%%%%%%%%%%%%%%%

function serial_dependancy = ChristoffersenTest(returns, var)
    
    n00 = 0;
    n01 = 0;
    n10 = 0;
    n11 = 0;
    
    for t = 502:size(returns)
        
        if  returns(t-1) > -var(t-1) && returns(t) > -var(t)
            n00 = n00 + 1;
        end
    
        if  returns(t-1) > -var(t-1) && returns(t) < -var(t)
            n01 = n01 + 1;
        end
    
        if  returns(t-1) < -var(t-1) && returns(t) > -var(t)
            n10 = n10 + 1;
        end
    
        if  returns(t-1) < -var(t-1) && returns(t) < -var(t)
            n11 = n11 + 1;
        end
    
    end
    
    pi = (n01+n11)/(n00+n01+n10+n11);
    pi01 = n01/(n00+n01);
    pi11 = n11/(n10+n11);
    alpha = 0.05;
    z = chi2inv(1-alpha,1);
    
    test = -2*log((1-pi)^(n00+n10)*pi^(n01+n11)) + 2*log((1-pi01)^n00 * pi01^n01 * (1-pi11)^n10 * pi11^n11);
    
    serial_dependancy = (test<z);
end



function Fail_res = Failure_Rate_Test(failures, alpha, lengthh)
    
    m_lower = norminv(alpha/2);
    m_upper = norminv(1-(alpha/2));
    
    Z = (failures - lengthh*alpha) / sqrt(lengthh*alpha*(1-alpha));

    Fail_res = (Z > m_upper || Z < m_lower);


end

















