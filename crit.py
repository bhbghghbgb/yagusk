import matplotlib.pyplot as plt
import numpy as np

# Constants
base_crit_rate = 0.05
base_crit_dmg = 0.50
max_crit_rate = 0.90
max_crit_dmg = 2.20

available_crit_rate = 0.85
available_crit_dmg = 1.70

hits_9_character = 9
hits_90_character = 90
damage_9_character = 1000
damage_90_character = 100

# Simulation settings
samples = 10


# Function to calculate total damage
def calculate_damage(base_dmg, crit_rate, crit_dmg, hits):
    total_damage = 0
    for _ in range(hits):
        if np.random.random() < crit_rate:
            total_damage += base_dmg * (1 + crit_dmg)
        else:
            total_damage += base_dmg
    return total_damage


# Arrays to store results
crit_rates = []
total_damages_9 = []
total_damages_90 = []


def crit_dmg_from_crit_rate(crit_rate):
    return base_crit_dmg + (base_crit_rate + max_crit_rate - crit_rate) * 2  # Trade-off


def crit_rate_from_crit_dmg(crit_dmg):
    return base_crit_rate + max_crit_rate - (crit_dmg - base_crit_dmg) / 2


for crit_rate in np.linspace(base_crit_rate, max_crit_rate, 200):
    crit_dmg = crit_dmg_from_crit_rate(crit_rate)

    crit_rates.append(crit_rate)

    damages_9 = [
        calculate_damage(damage_9_character, crit_rate, crit_dmg, hits_9_character)
        for _ in range(samples)
    ]
    damages_90 = [
        calculate_damage(damage_90_character, crit_rate, crit_dmg, hits_90_character)
        for _ in range(samples)
    ]

    total_damages_9.append(damages_9)
    total_damages_90.append(damages_90)

# Plotting
fig, ax = plt.subplots(2, 1, figsize=(14, 10), sharex=True)

for sample in range(samples):
    ax[0].plot(
        crit_rates,
        [damage[sample] for damage in total_damages_9],
        label=f"Sample {sample + 1}",
    )
    ax[1].plot(
        crit_rates,
        [damage[sample] for damage in total_damages_90],
        label=f"Sample {sample + 1}",
    )

ax[0].set_title("Damage for Character with 9 Hits of 1000 Damage")
ax[0].set_ylabel("Total Damage")
ax[1].set_title("Damage for Character with 90 Hits of 100 Damage")
ax[1].set_ylabel("Total Damage")
ax[1].set_xlabel("Crit Rate")

ax2 = ax[0].secondary_xaxis(
    "top",
    functions=(
        crit_dmg_from_crit_rate,
        crit_rate_from_crit_dmg,
    ),
)
ax2.set_xlabel("Crit Damage")

ax[0].legend(loc="upper left", bbox_to_anchor=(1, 1))
ax[1].legend(loc="upper left", bbox_to_anchor=(1, 1))

plt.tight_layout()
plt.show()
