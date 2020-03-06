# staging products
# permanent_colours = [293507301405, 293507563549, 293508087837, 293508349981, 293509529629, 293510021149, 293510774813, 293511364637, 293511757853, 293512216605, 293512773661, 293513265181]
# tinted_dry_shampoos = [293492817949, 293492654109, 293493145629]

# production products
permanent_colours = [553950773271, 553950314519, 553950543895, 553950478359, 553950740503, 553950576663, 553950117911, 553950216215, 553950511127, 553950380055, 553950281751, 553950150679]
tinted_dry_shampoos = [553949954071, 553949528087, 553949855767]

permanent_colours_seen = []
tinted_dry_shampoos_seen = []

Input.cart.line_items.each do |line_item|
  product = line_item.variant.product

  if permanent_colours.include?(product.id)
    for i in 1..line_item.quantity do
      permanent_colours_seen << product.id
    end
  end

  if tinted_dry_shampoos.include?(product.id)
    for i in 1..line_item.quantity do
      tinted_dry_shampoos_seen << product.id
    end
  end
end

# puts "total permanent colours: #{permanent_colours_seen.size}"
# puts "total tinted dry shampoos: #{tinted_dry_shampoos_seen.size}"

if permanent_colours_seen.size > 0 and tinted_dry_shampoos_seen.size > 0
  total_eligible_items = 1
  total_eligible_items_remaining = total_eligible_items

  # puts "total eligible items: #{total_eligible_items}"

  Input.cart.line_items.each do |line_item|
    break if total_eligible_items_remaining == 0

    if total_eligible_items_remaining > 0
      product = line_item.variant.product

      if tinted_dry_shampoos_seen.include?(product.id)
        # puts "-- discounts still available: #{total_eligible_items_remaining}"

        discounted_items = 1
        new_price = line_item.original_line_price - (line_item.variant.price * discounted_items)
        total_eligible_items_remaining = total_eligible_items_remaining - discounted_items

        line_item.change_line_price(new_price, message: "Promo: free product")

        # puts "-- item quantity discounted: #{discounted_items}"
        # puts "-- discounts now remaining: #{total_eligible_items_remaining}"
      end
    end
  end
end

Output.cart = Input.cart
