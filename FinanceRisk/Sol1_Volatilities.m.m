kursdaily = readmatrix('DataAssignment1TPPE32.xlsx','Sheet','Daily','Range','B2:B6032');
kursweekly = readmatrix('DataAssignment1TPPE32.xlsx','Sheet','Weekly','Range','B2:B1255');

USDSEKdaily = readmatrix('DataAssignment1TPPE32.xlsx','Sheet','Daily','Range','C2:C6032');
USDSEKweekly = readmatrix('DataAssignment1TPPE32.xlsx','Sheet','Weekly','Range','C2:C1255');

garchOmxVariance = readmatrix('DataAssignment1TPPE32.xlsx', 'Sheet', 'GARCH_OMXS_30', 'Range', 'E5:E1256');
garchUSDSEKVariance = readmatrix('DataAssignment1TPPE32.xlsx', 'Sheet', 'GARCH_USDSEK', 'Range', 'E5:E1256');

datumdaily = readmatrix('DataAssignment1TPPE32.xlsx','Sheet','Daily','Range','A2:A6032');
datdaily = datumdaily + 693960;
datumweekly = readmatrix('DataAssignment1TPPE32.xlsx','Sheet','Weekly','Range','A2:A1255');
datweekly = datumweekly + 693960;

figure(1)
plot(datweekly,USDSEKweekly)
ylabel('USD/SEK') %Beskrivning y-axel
yyaxis right %Aktivera den hogra y-axeln
plot(datweekly,kursweekly)
ylabel('OMXS30')
datetick('x','yy') %Satter datumformatet yy pa x-axeln
xlabel('Datum')
title('Tidsserier') %Titel
legend('OMXS30','USD/SEK','location','northwest')

figure(2)
R_OMXS30weekly = log(kursweekly(2:end)./kursweekly(1:end-1)); %Elementvis division!
R_USDSEKweekly = log(USDSEKweekly(2:end)./USDSEKweekly(1:end-1)); %Elementvis division!

R_OMXS30daily = log(kursdaily(2:end)./kursdaily(1:end-1)); %Elementvis division!
R_USDSEKdaily = log(USDSEKdaily(2:end)./USDSEKdaily(1:end-1)); %Elementvis division!
histogram(R_OMXS30weekly*100)
title('Distribution of log-returns, OMXS30')
xlabel('log-returns (%)')
ylabel('Frequency')

avgweekly = mean(R_OMXS30weekly);
avgdaily = mean(R_OMXS30daily);
avgyearly = avgweekly * 52;
avgUSDSEKweekly = mean(R_USDSEKweekly);
avgUSDSEKdaily = mean(R_USDSEKdaily);
avgUSDSEKyearly = avgUSDSEKweekly*52;
volatilityweekly = std(R_OMXS30weekly);
volatilitydaily = std(R_OMXS30daily);
volatilityyearly = volatilityweekly * sqrt(52);
volatilityUSDSEKweekly = std(R_USDSEKweekly);
volatilityUSDSEKdaily = std(R_USDSEKdaily);
volatilityUSDSEKyearly = volatilityUSDSEKweekly*sqrt(52);


confidenyearlyupper = avgyearly + 1.96 * (volatilityyearly/sqrt(length(R_OMXS30weekly)));
confidenceyearlylower = avgyearly - 1.96 * (volatilityyearly/sqrt(length(R_OMXS30weekly)));

confidenyearlyupperUSDSEK = avgUSDSEKyearly + 1.96 * (volatilityUSDSEKyearly/sqrt(length(R_USDSEKweekly)));
confidenceyearlylowerUSDSEK = avgUSDSEKyearly - 1.96 * (volatilityUSDSEKyearly/sqrt(length(R_USDSEKweekly)));

disp("Uppgift 1a)")
disp("Årlig avkastning omsx30 i procent: " + avgyearly*100 + '%')
disp("Årlig volatilitet omsx30 i procent: " + volatilityyearly*100 + '%')

disp("Årlig avkastning usdsek i procent: " + avgUSDSEKyearly*100 + '%')
disp("Årlig volatilitet usdsek i procent: " + volatilityUSDSEKyearly*100 + '%')
disp("Konfidensintervall: " + confidenceyearlylower + " : " + confidenyearlyupper)
disp("KonfidensintervallUSDSEK: " + confidenceyearlylowerUSDSEK + " : " + confidenyearlyupperUSDSEK)


%1b)
%i)


skewnessweekly = skewness(R_OMXS30weekly);
skewnessdaily = skewness(R_OMXS30daily);
skewnessweeklyUSDSEK = skewness(R_USDSEKdaily);
skewnessdailyUSDSEK = skewness(R_USDSEKweekly);

kurtosisweekly = kurtosis(R_OMXS30weekly);
kurtosisdaily = kurtosis(R_OMXS30daily);
kurtosisweeklyUSDSEK = kurtosis(R_USDSEKweekly);
kurtosisdailyUSDSEK = kurtosis(R_USDSEKdaily);

%ii)
figure(3)
subplot(2,2,1)
histogram(R_OMXS30daily*100)
histfit(R_OMXS30daily)
title("daily omx")

subplot(2,2,2)
histogram(R_OMXS30weekly*100)
histfit(R_OMXS30weekly)
title("weekly omx")

subplot(2,2,3)
histogram(R_USDSEKdaily*100)
histfit(R_USDSEKdaily)
title("daily usdsek")

subplot(2,2,4)
histogram(R_USDSEKweekly*100)
histfit(R_USDSEKweekly)
title("weekly usdsek")

percentilesweekly = prctile(R_OMXS30weekly, [1, 5, 95, 99]);
percentilesdaily = prctile(R_OMXS30daily, [1, 5, 95, 99]);
percentilesweeklyUSDSEK = prctile(R_USDSEKweekly, [1, 5, 95, 99]);
percentilesdailyUSDSEK = prctile(R_USDSEKdaily, [1, 5, 95, 99]);



%iii)
%MatLab qq-plots:
figure(4)
subplot(2,2,1)
qqplot(R_OMXS30daily)
title('qq-plot OMXS30 daily')
subplot(2,2,2)
qqplot(R_OMXS30weekly)
title('qq-plot OMXS30 weekly')
subplot(2,2,3)
qqplot(R_USDSEKdaily)
title('qq-plot USD/SEK daily')
subplot(2,2,4)
qqplot(R_USDSEKweekly)
title('qq-plot USD/SEK weekly')

%Våra qq-plots:
sortedweeklyR = sort(R_OMXS30weekly);
Nweekly = length(R_OMXS30weekly);
quantilesweeklyR = ((1:Nweekly)-0.5) / Nweekly;
quantilesweeklyR2 = norminv(quantilesweeklyR, avgweekly, volatilityweekly);

figure(5)
subplot (2,2,1)
plot(quantilesweeklyR2, sortedweeklyR, '+')
hold on;
plot(quantilesweeklyR2, quantilesweeklyR2)
title('qq-plot OMXS30 weekly self-made')
hold off;

%---------
sorteddailyR = sort(R_OMXS30daily);
Ndaily = length(R_OMXS30daily);
quantilesdailyR = ((1:Ndaily)-0.5) / Ndaily;
quantilesdailyR2 = norminv(quantilesdailyR, avgdaily, volatilitydaily);

subplot (2,2,2)
plot(quantilesdailyR2, sorteddailyR, '+')
hold on;
plot(quantilesdailyR2, quantilesdailyR2)
title('qq-plot OMXS30 daily self-made')
hold off;

%------------


sortedweeklyUSDSEKR = sort(R_USDSEKweekly);
NweeklyUSDSEK = length(R_USDSEKweekly);
quantilesweeklyUSDSEK = ((1:NweeklyUSDSEK)-0.5) / NweeklyUSDSEK;
quantilesweeklyUSDSEK2 = norminv(quantilesweeklyUSDSEK, avgUSDSEKweekly, volatilityUSDSEKweekly);

subplot (2,2,3)
plot(quantilesweeklyUSDSEK2, sortedweeklyUSDSEKR, '+')
hold on;
plot(quantilesweeklyUSDSEK2, quantilesweeklyUSDSEK2)
title('qq-plot USD/SEK weekly self-made')
hold off;


%---------------

sorteddailyUSDSEKR = sort(R_USDSEKdaily);
NdailyUSDSEK = length(R_USDSEKdaily);
quantilesdailyUSDSEK = ((1:NdailyUSDSEK)-0.5) / NdailyUSDSEK;
quantilesdailyUSDSEK2 = norminv(quantilesdailyUSDSEK, avgUSDSEKdaily, volatilityUSDSEKdaily);

subplot (2,2,4)
plot(quantilesdailyUSDSEK2, sorteddailyUSDSEKR, '+')
hold on;
plot(quantilesdailyUSDSEK2, quantilesdailyUSDSEK2)
title('qq-plot USD/SEK daily self-made')
hold off;


disp("Uppgift 1b)")
disp("Skewness: ")
disp("Skewness OMXS30 daily: " + skewnessdaily + " Skewness OMXS30 weekly: " + skewnessweekly + " Skewness USD/SEK daily: " + skewnessdailyUSDSEK + " Skewness USD/SEK weekly: " + skewnessweeklyUSDSEK)
disp("kurtosis: ")
disp("kurtosis OMXS30 daily: " + kurtosisdaily + " kurtosis OMXS30 weekly: " + kurtosisweekly + " kurtosis USD/SEK daily: " + kurtosisdailyUSDSEK + " kurtosis USD/SEK weekly: " + kurtosisweeklyUSDSEK)
disp("Percentiles daily: ")
disp(percentilesdaily)
disp("Percentiles weekly: ")
disp(percentilesweekly)
disp("Percentiles usd/sek daily: ")
disp(percentilesdailyUSDSEK)
disp("Percentiles usd/sek weekly: ")
disp(percentilesweeklyUSDSEK)





figure(50)
datweekly1 = datweekly(2:end)
plot(datweekly1,R_USDSEKweekly)
ylabel('USD/SEK') %Beskrivning y-axel
yyaxis right %Aktivera den hogra y-axeln
plot(datweekly1,R_OMXS30weekly)
ylabel('OMXS30')
datetick('x','yy') %Satter datumformatet yy pa x-axeln
xlabel('Datum')
title('Tidsserier') %Titel
legend('OMXS30','USD/SEK','location','northwest')


%----------------------------------------------------------------------

%2a)

R_OMXS30weekly2 = R_OMXS30weekly .^2;
R_USDSEKweekly2 = R_USDSEKweekly .^2;

n = length(R_OMXS30weekly2);
EQWMA30_omxs = zeros(n,1);

for t = 31:n
    EQWMA30_omxs(t) = sqrt(sum(R_OMXS30weekly2(t-30:t)))/30*sqrt(52);
end

n2 = length(R_OMXS30weekly2);
EQWMA30_usdsek = zeros(n2,1);

for t = 31:n2
    EQWMA30_usdsek(t) = sqrt(sum(R_USDSEKweekly2(t-30:t)))/30*sqrt(52);
end

%---

n = length(R_OMXS30weekly2);
EQWMA90_omxs = zeros(n,1);

for t = 91:n
    EQWMA90_omxs(t) = sqrt(sum(R_OMXS30weekly2(t-90:t)))/90*sqrt(52);
end

n2 = length(R_OMXS30weekly2);
EQWMA90_usdsek = zeros(n2,1);

for t = 91:n2
    EQWMA90_usdsek(t) = sqrt(sum(R_USDSEKweekly2(t-90:t)))/90*sqrt(52);
end

figure(6);
subplot(2,2,1)
plot(EQWMA30_omxs);
title("EqWMA - OMXweekly - 30");
subplot(2,2,2)
plot(EQWMA90_omxs);
title("EqWMA - OMXweekly - 90");
subplot(2,2,3)
plot(EQWMA30_usdsek);
title("EqWMA - FXweekly - 30");
subplot(2,2,4)
plot(EQWMA90_usdsek);
title("EqWMA - FXweekly - 90");


%2b)

lambda = 0.94;

n = length(R_OMXS30weekly2);
EWMA_OMXS = zeros(n,1);
EWMA_OMXS(2) = R_OMXS30weekly(1)^2;
for t = 3:n
    EWMA_OMXS(t) = lambda * EWMA_OMXS(t-1) + (1-lambda) * R_OMXS30weekly2(t-1);
end

EWMA_USDSEK = zeros(n,1);

EWMA_USDSEK(2) = R_USDSEKweekly(1)^2;
for t = 3:n
    EWMA_USDSEK(t) = lambda * EWMA_USDSEK(t-1) + (1-lambda) * R_USDSEKweekly2(t-1);
end


figure(7);
subplot(2,1,1)
plot(EWMA_OMXS);
title("EWMA OMXS30");
subplot(2,1,2)
plot(EWMA_USDSEK);
title("EWMA USDSEK");


%2c)

EWMAlambdaOMX = 0.913351131;
EWMAlambdaUSDSEK = 0.902396586;

EWMA_OMXS_lambda = zeros(n,1);
EWMA_OMXS_lambda(2) = R_OMXS30weekly(1)^2;
for t = 3:n
    EWMA_OMXS_lambda(t) = EWMAlambdaOMX * EWMA_OMXS_lambda(t-1) + (1-EWMAlambdaOMX) * R_OMXS30weekly2(t-1);
end

EWMA_USDSEK_lambda = zeros(n,1);

EWMA_USDSEK_lambda(2) = R_USDSEKweekly(1)^2;
for t = 3:n
    EWMA_USDSEK_lambda(t) = EWMAlambdaUSDSEK * EWMA_USDSEK_lambda(t-1) + (1-EWMAlambdaUSDSEK) * R_USDSEKweekly2(t-1);
end

figure(8)
subplot(2,1,1)
plot(EWMA_OMXS_lambda * sqrt(52));
title("EWMA - OMX - calcLambda");
subplot(2,1,2)
plot(EWMA_USDSEK_lambda * sqrt(52));
title("EWMA - USDSEK - calcLambda");

%GARCH
figure(9)
subplot(2,1,1)
plot(sqrt(garchOmxVariance) * sqrt(52));
title("Garch - OMX");
subplot(2,1,2)
plot(sqrt(garchUSDSEKVariance) * sqrt(52));
title("Garch - USDSEK");


%2d)

%QQ-plot av std. tidsserier utifrån estimerade GARCH(1,1)-volatiliteter.
weeklyOMXGarchSTD = R_OMXS30weekly;
weeklyUSDSEKGarchSTD = R_USDSEKweekly;

for i = 1:n-3
    weeklyOMXGarchSTD(i) = (weeklyOMXGarchSTD(i+1))/sqrt(garchOmxVariance(i));
    weeklyUSDSEKGarchSTD(i) = (weeklyUSDSEKGarchSTD(i+1))/sqrt(garchUSDSEKVariance(i));
end
figure(10);
subplot(2,1,1)
qqplot(weeklyOMXGarchSTD);
title("weekly OMX (garch(1,1)) std.");
xlim([-4 4])
ylim([-4 4])

subplot(2,1,2)
qqplot(weeklyUSDSEKGarchSTD);
title("weekly USDSEK (garch(1,1)) std.");


%3
%3a)

correlation_OMXS_USDSEK = corr(R_OMXS30weekly, R_USDSEKweekly);

%3b)

auto_correlation_OMXS_1 = autocorr(R_OMXS30weekly);
% auto_correlation_OMXS_2 = autocorr(R_OMXS30weekly, 2);
% auto_correlation_OMXS_3 = autocorr(R_OMXS30weekly, 3);
% auto_correlation_OMXS_4 = autocorr(R_OMXS30weekly, 4);
% auto_correlation_OMXS_5 = autocorr(R_OMXS30weekly, 5);

auto_correlation_USDSEK_1 = autocorr(R_USDSEKweekly);
% auto_correlation_USDSEK_2 = autocorr(R_USDSEKweekly, 2);
% auto_correlation_USDSEK_3 = autocorr(R_USDSEKweekly, 3);
% auto_correlation_USDSEK_4 = autocorr(R_USDSEKweekly, 4);
% auto_correlation_USDSEK_5 = autocorr(R_USDSEKweekly, 5);

%3c)
Residuals_OMXS = readmatrix('DataAssignment1TPPE32.xlsx', 'Sheet', 'GARCH_OMXS_30', 'Range', 'H5:H1256');
Residuals_USDSEK = readmatrix('DataAssignment1TPPE32.xlsx', 'Sheet', 'GARCH_USDSEK', 'Range', 'H5:H1256');

uniform_residuals = normcdf([Residuals_OMXS, Residuals_USDSEK], 0, 1);


%copula-fit

[Student_t_copula_OMXS, freedom] = copulafit('t', uniform_residuals);
Gaussian_copula_OMXS = copulafit('Gaussian', uniform_residuals);
Frank_copula_OMXS = copulafit('Frank', uniform_residuals);
Gumbel_copula_OMXS = copulafit('Gumbel', uniform_residuals);
Clayton_copula_OMXS = copulafit('Clayton', uniform_residuals);

y_t_copula_OMXS = copulapdf('t', uniform_residuals, Student_t_copula_OMXS, freedom);
y_Gaussian_copula_OMXS = copulapdf('Gaussian', uniform_residuals, Gaussian_copula_OMXS);
y_Frank_copula_OMXS = copulapdf('Frank', uniform_residuals, Frank_copula_OMXS);
y_Gumbel_copula_OMXS = copulapdf('Gumbel', uniform_residuals, Gumbel_copula_OMXS);
y_Clayton_copula_OMXS = copulapdf('Clayton', uniform_residuals, Clayton_copula_OMXS);


sum_gaussian = 0;
sum_clayton = 0;
sum_frank = 0;
sum_gumbel = 0;
sum_t = 0;
for i = 1:n - 2
    sum_t = sum_t + log(y_t_copula_OMXS(i));
    sum_gaussian = sum_gaussian + log(y_Gaussian_copula_OMXS(i));
    sum_frank = sum_frank + log(y_Frank_copula_OMXS(i));
    sum_gumbel = sum_gumbel + log(y_Gumbel_copula_OMXS(i));
    sum_clayton = sum_clayton + log(y_Clayton_copula_OMXS(i));
end

%t best fitting



num_samples = size(uniform_residuals, 1);
simulated_data_t = copularnd('t', Student_t_copula_OMXS, freedom, num_samples);

figure(17);

% Scatter plot for original data
subplot(1,2,1);
scatter(uniform_residuals(:,1), uniform_residuals(:,2), 10, 'filled', 'blue');
title('Original Uniform Residuals');
xlabel('Uniform Residuals OMXS');
ylabel('Uniform Residuals USDSEK');
grid on;

%Scatter plot for simulated data from the Student-t copula
subplot(1,2,2);
scatter(simulated_data_t(:,1), simulated_data_t(:,2), 10, 'filled', 'red');
title('Simulated Data from Student-t Copula');
xlabel('Simulated Data OMXS');
ylabel('Simulated Data USDSEK');
grid on;




% OUTPUT


output.RIC = {'.OMXS30', 'USD/SEK'};
output.stat.mu = [avgyearly*100 avgUSDSEKyearly*100];
output.stat.sigma = [volatilityyearly*100 volatilityUSDSEKyearly*100];     
output.stat.CI = [confidenceyearlylower*100 confidenyearlyupper*100; confidenceyearlylowerUSDSEK*100 confidenyearlyupperUSDSEK*100];
output.stat.skew = [skewnessdaily skewnessweekly skewnessdailyUSDSEK skewnessweeklyUSDSEK];
output.stat.kurt = [kurtosisweekly kurtosisweeklyUSDSEK kurtosisdaily kurtosisdailyUSDSEK];
output.stat.perc = [percentilesdaily*100; percentilesweekly*100;
                    percentilesdailyUSDSEK*100; percentilesweeklyUSDSEK*100];
output.stat.corr = [correlation_OMXS_USDSEK];
output.stat.acorr = [auto_correlation_OMXS_1(2) auto_correlation_USDSEK_1(2);
                     auto_correlation_OMXS_1(3) auto_correlation_USDSEK_1(3);
                     auto_correlation_OMXS_1(4) auto_correlation_USDSEK_1(4);
                     auto_correlation_OMXS_1(5) auto_correlation_USDSEK_1(5);
                     auto_correlation_OMXS_1(6) auto_correlation_USDSEK_1(6)];
output.EWMA.obj = [7720.798778 9086.07641]; %[log-L (RIC1), log-L (RIC2)]
output.EWMA.param = [0.913351131 0.902396586]; %[lambda (RIC1), lambda (RIC2)]
output.GARCH.obj = [7774.875814 9225.712712];
output.GARCH.param = [sqrt(0.0010925 * 52), 0.14234717862452, 0.825476552344757, sqrt(0.0002446 * 52), 0.090937141, 0.810509328]; % [sigma, alpha, beta (RIC1), sigma, alpha, beta (RIC2) (unconstrained MLE)] %sigma is the yearly volatility, i.e. sqrt(VL*52), from MLE
output.GARCH.objVT = [7774.411516 9225.668355];
output.GARCH.paramVT = [sqrt(0.0009075149*52), 0.137925449, 0.819551691, sqrt(0.0002487907*52), 0.092342468, 0.810880659];%[sigma, alpha, beta (RIC1), sigma, alpha, beta (RIC2) (variance targeting)]
output.copulaLogL = [sum_gaussian sum_t sum_gumbel sum_clayton sum_frank];

printResults(output, true);
